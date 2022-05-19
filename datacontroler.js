const Noticia = require('./model/Noticia.js');
const fs = require('fs');
const User = require('./model/User.js');
const Columna = require('./model/Columna.js');
const Destacada = require('./destacada.js');
const Masleidos = require('./masleidos.js')
const Tags = require('./tags.js');
const sharp = require('sharp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const datacontroler = {
  frontpage: async function(){
    //exporta un objeto que contiene todos datos para frontpage
    // if(this.cache.frontpage)return this.cache.frontpage;
    try {

      let query={tipo: 'noticia'};
      let searchoptions = {sort : {pubdate:-1}, limit: 12};
      let nuevosarticulos = await Noticia.find(query, null, searchoptions);
      let destacada = Destacada.actual();
      let fechaminima = Date.now()-(31*24*60*60*1000);
      let destacadaquery={
        pubdate:{'$gt':fechaminima},
        tags: destacada,
        tipo: 'noticia',
      };
      searchoptions.limit = 3;
      let destacadas = await Noticia.find(destacadaquery, null, searchoptions);

      for (let x=nuevosarticulos.length-1;x>=0;x--){
        for (let y=destacadas.length-1;y>=0;y--){
          if(nuevosarticulos[x]._id==destacadas[y]._id){
            nuevosarticulos.splice(x,1);
          }
        }
      }
      let masleidosids = Masleidos.ultimos(5);
      let masleidos = [];
      if(masleidosids.length>0){
        query = {
          _id: {'$in':masleidosids}
        }
        masleidos = await Noticia.find(query);
      }

      query = {
        tipo: 'resumensemanal',
      };
      searchoptions= {sort: {pubdate:-1}, limit: 1}
      let resumensemanal = await Noticia.find(query, null, searchoptions);
      //expresso-giramundo?
      query = {
        tipo: 'noticia',
        autor: 'comecuco',
      }
      searchoptions.limit = 2;
      let produccionesColectivas = await Noticia.find(query, null, searchoptions);


      let columnas = await Columna.find();
      columnas = columnas.sort(function(a,b){return a.lastUpdated - b.lastUpdated})
      //solo columnas con ultima subida no mas viejo que 2 meses?

      query={
        ultimaSubida:{'$gt':fechaminima}
      };
      searchoptions={sort: {ultimaSubida:-1}};
      let medios = await User.find(query, null, searchoptions);

      let newfrontpage = {
        articulos:nuevosarticulos,
        destacadas:destacadas,
        masleidos:masleidos,
        resumen:resumensemanal,
        colectivas:produccionesColectivas,
        columnas:columnas,
        medios: medios,
      }

      return newfrontpage;
    } catch (e) {
      console.log('error in fp',e);
      return false;
    }
  },
  noticia: async function(id){
    try {
      let not = await Noticia.findOne({_id:id});
      if(!not)return false;
      let autor = await User.findOne({_id:not.idDeAutor})
      if(!autor)return false;
      return {noticia:not, autor:autor};
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  noticias: async function(pagenr){
    try {
      let query = {tipo:'noticia'};
      let limit = 20;
      let qopt = {sort : {pubdate:-1}, limit: limit};
      if(pagenr)qopt.skip=pagenr*limit;
      let noticias = await Noticia.find(query,null,qopt);
      return noticias;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  medio: async function(url, pagenr,onlyUser){
    try {
      let medio = await User.findOne({url:url});
      if(!medio){
        let date = new Date().toGMTString();
        console.log('user not found',url,date);
        return false;
      }
      if(onlyUser)return medio;
      let query = {idDeAutor:medio._id};
      let queryoptions = {sort : {pubdate:-1}, limit: 50};
      if(pagenr)queryoptions.skip=pagenr*50;
      let noticias = await Noticia.find(query,null,queryoptions);
      return {medio:medio,noticias:noticias};
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  usuario: async function(id){
    try {
      let medio = await User.findOne({_id:id});
      if(!medio){
        let date = new Date().toGMTString();
        console.log('user not found',url,date);
        return false;
      }
      return medio;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  columna: async function(url){
    try {
      let columna = await Columna.find({url:url});
      if(!columna || !columna.capitulos)return false;
      let capitulos = await Noticia.find({$in:{_id:columna.capitulos}});
      let result = {columna:columna,capitulos:capitulos};
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  columnas: async function(){
    try {
      let columnas = await Columna.find();
      columnas.sort(function(a,b){return b.lastUpdated - a.lastUpdated})
      return columnas;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  quienessomos: async function(){
    try {
      let medios = await User.find();
      medios.sort(function(a,b){return a.name-b.name});
      let imagenes = fs.readdirSync('public/static/quienessomos');
      return {medios:medios, images: imagenes};
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  resumensemanal: async function(pagenr){
    try {
      let query={tipo:'resumensemanal'};
      let qopt={sort : {pubdate:-1}, limit:100};
      if(pagenr)qopt.skip=pagenr*100;
      let resumenes = await Noticia.find(query,null,qopt);
      return resumenes;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  iniciarSession: async function(username, password){
    try {
      let user = await User.findOne({name:username});
      if(!user)user = await User.findOne({email:username});
      if(!user){
        console.log('user not found',username);
        return false;
      }
      let validation = await bcrypt.compare(password, user.password);
      if(!validation){
        console.log('password wrong',username);
        return false;
      }
      user.lastLogin=Date.now();
      user.save();
      const token = jwt.sign({
        _id:user._id,
        url:user.url,
        ttl: process.env.TOKENTTL,
        }, process.env.TOKEN_SECRET);
      return token;

    } catch (e) {
      console.log(e);
      return false;
    }
  },
  // logged-in-stuff:
  dashboard: async function(jwt){
    //user._id & user.url available
    try {
      let user = await User.findOne({_id:jwt._id})
      if(!user){
        console.log('user not found',jwt);
        return false;
      }
      let query={idDeAutor:user._id};
      let qopt={sort : {pubdate:-1}, limit:20};
      let noticias = await Noticia.find(query,null,qopt)
      query={autor:'comecuco'}
      let comecucos = await Noticia.find(query,null,qopt)
      let columnas = await Columna.find({author:user.name})
      let destacadas = Destacada.calendarioseis() //meses,destacadas
      return {
        user:user,
        noticias:noticias,
        conjuntos:comecucos,
        columnas: columnas,
        destacadas:destacadas,
      }
    } catch (e) {
      console.warn('dashboard went wrong',e)
      return false
    }
  },
  editarNoticia: async function(id, userid){

    try {
      let user = await User.findOne({_id:userid})
      if(!user)return false;
      let columnas = await Columna.find({author:user.name})
      let alltags = Tags.tags.join(',')
      if(!id){
        console.log('nueva noticia');
        let nuevanoticia = {
          new:true,
          user:user,
          columnas:columnas,
          alltags:alltags,
          noticia:{
            title:'', subtitle:'',
            author:user.name,
            idDeAutor: user._id,
            tags:'',
            pubdate:Date.now(),
            images:[],
            audios:[],
            body:'',
          }
        }
        // console.log(nuevanoticia);
        return nuevanoticia
      }
      let articulo = await Noticia.findOne({_id:id});
      return {
        user:user,
        columnas:columnas,
        alltags:alltags,
        noticia:articulo
      }
    } catch (e) {
      console.log('editar noticia error',e);
      return false;
    }
  },
  datainput: {
    chooseNewName: function(path,fname){
        let filename = fname.toLowerCase();
        let allowed = 'abcdefghijklmnopqrstuvwxyz0123456789.-';
        let allowedExt='png,jpg,mp3,ogg,gif';
        for (let x=0;x<filename.length;x++){
          if(allowed.indexOf(filename[x])==-1)filename[x]='-';
        }
        console.log('new filename',filename);
        let ext = filename.substring(filename.lastIndexOf('.')+1);
        if(allowedExt.indexOf(ext)==-1)return false;
        if(!fs.existsSync(path+filename))return filename;
        let filen=filename.substring(0,filename.length-ext.length);
        let n=0;
        while(fs.existsSync(path+filen+n+ext)){
          n++;
          if(n==20)filen+='-';
          if(n==30)filen+='--';
          if(n>100)break;
        }
        return filen+n+ext;
    },
    //check for user-right to put data in here or else?
    //lets presume its already checked
    noticia: async function(content, user){
      console.log('writing noticia');
      let simplefields = ['title','subtitle','author','body','resumen','tipo'];
      let updateobj = {};
      let cdate = new Date();
      for (let x=0;x<simplefields.length;x++){
        updateobj[simplefields[x]]=content[simplefields[x]];
      }
      //missing: tags, audios, images, idDeAutor, columna
      //dates: pubdate, lastupdated
      updateobj.columna=content.columna;
      //tags:
      updateobj.tags = content.tags.split(',');
      for(let t=updateobj.tags.length-1;t>=0;t--)if(updateobj.tags[t]=='')updateobj.tags.splice(t,1);
      if(updateobj.tags.length>0)Tags.addTags(updateobj.tags);
      else console.log('no tags found',updateobj.tags, content.tags);
      //id:
      updateobj.idDeAutor = user._id;
      //pubdate:
      let pdate = new Date(content.pubdate);
      if(content.pubdate.length>0 && pdate!='Invalid Date'){
        updateobj.pubdate = pdate;
      }else if(content.isnew){
        updateobj.pubdate = cdate;
      }
      //lastUpdated:
      updateobj.lastUpdated = cdate;
      //images
      let newimages = [];
      let x=0;
      if(content.deleteimages){
        //delete images from hdd BEFORE putting new one in as they could be "replaced"
        for (x=0;x<content.deleteimages.length;x++){
          let delpath = "."+content.deleteimages[x];
          if(!fs.existsSync(delpath))continue;
          //check for malformed strings:
          if(content.deleteimages[x].substring(0,'/public/files/images/'.length)!='/public/files/images/')continue;
          if(content.deleteimages[x].indexOf('..')>-1)continue;
          //should we move or just delete files?
          //move: fs.renameSync(delpath, './private/deleted'+content.deleteimages[x]);
          //delete:
          fs.unlinkSync(delpath);
        }
      }
      if(content.deleteaudios){
        //delete audios from hdd BEFORE putting new one in as they could be "replaced"
        for (x=0;x<content.deleteaudios.length;x++){
          let delpath = "."+content.deleteaudios[x];
          if(!fs.existsSync(delpath))continue;
          //check for malformed strings:
          if(content.deleteaudios[x].substring(0,'/public/files/audios/'.length)!='/public/files/audios/')continue;
          if(content.deleteaudios[x].indexOf('..')>-1)continue;
          //should we move or just delete files?
          //move: fs.renameSync(delpath, './private/deleted'+content.deleteaudios[x]);
          //delete:
          fs.unlinkSync(delpath);
        }
      }
      if(content.images){
        console.log('saving images',content.images);
        let imgpath = './public/files/images/'+cdate.getFullYear()+'/'+cdate.getMonth();
        if(!fs.existsSync(imgpath))fs.mkdirSync(imgpath,{recursive:true});
        imgpath+='/';
        for (x=0;x<content.images.length;x++){
          let imgname = content.images[x].filename;
          imgname=this.chooseNewName(imgpath,imgname);
          imgurl = imgpath.substring(1)+imgname;
          if(!imgname){
            console.log('imagename not allowed?',imgname,content.images[x].filename);
            continue;
          }
          console.log('save image as',imgname,'in',imgpath);
          let savedimg = await saveImage(imgpath+imgname, content.images[x].data, 640, 480);
          console.log('saved image?',savedimg);
          if(savedimg)newimages.push({
            url:imgurl,
            title: content.imagetitles[x],
          });
        }
      }
      //audios
      let newaudios = [];
      if(content.audios && content.audios.length>0){
        let audiopath = './public/files/audios/'+cdate.getFullYear()+'/'+cdate.getMonth();
        if(content.tipo=='resumensemanal')audiopath='./public/files/audios/resumensemanal';
        //podemos tambien filtrar los capitulos de columnas por columna
        if(!fs.existsSync(audiopath))fs.mkdirSync(audiopath,{recursive:true});
        audiopath+='/';
        for (x=0;x<content.audios.length;x++){
          let audioname = content.audios[x].filename;
          audioname=this.chooseNewName(audiopath,audioname);
          if(!audioname){
            console.log('audio not allowed?',audioname,content.audios[x].filename);
            continue;
          }
          //save audio to disk
          fs.writeFileSync(audiopath+audioname,content.audios[x].data);
          newaudios.push({
            url:audiopath.substring(1)+audioname,
            description: content.audiodescription[x],
            //id? we dont save audio in db
          });
        }
      }
      console.log('content is new?',content.isnew);
      if(content.isnew ){
        updateobj.audios=newaudios;
        updateobj.images = newimages;
        console.log('updateobject:',updateobj);

        try {
          let newnoticia = new Noticia(updateobj);
          let savednoticia = await newnoticia.save();
          console.log('saved new article',savednoticia._id, savednoticia.title);
          //check for columna:
          if(content.tipo=="capitulo"){
            //add to columna
            let colid=content.columna;
            let columna= await Columna.findOne({_id:colid});
            if(!columna)return false;
            columna.capitulos.push(savednoticia._id);
            columna.ultimoCapitulo.titulo=savednoticia.title;
            // columna.ultimoCapitulo.url=savednoticia.url;
            columna.ultimoCapitulo.id=savednoticia._id;
            columna.lastUpdated=cdate;
            if(newimages[0] && newimages[0].url)columna.ultimoCapitulo.imagen=newimages[0].url;
            let savedcol = await columna.save();
            console.log('updated columna',savedcol);
          }
          return savednoticia;
        } catch (e) {
          console.log(e);
          return false;
        }
      }else{

        try {
          let oldnoticia = await Noticia.findOne({_id:content.id});
          if(!oldnoticia)return false;
          console.log('old noticia',oldnoticia.title, oldnoticia._id);
          //check for columna:
          if(content.tipo=="capitulo"){
            if(oldnoticia.tipo!='capitulo' || oldnoticia.columna!=content.columna){
              //add to columna
              let colid=content.columna;
              let columna= await Columna.findOne({_id:colid});
              if(!columna)return false;
              columna.capitulos.push(savednoticia._id);
              columna.ultimoCapitulo.titulo=savednoticia.title;
              // columna.ultimoCapitulo.url=savednoticia.url;
              columna.ultimoCapitulo.id=savednoticia._id;
              columna.lastUpdated=cdate;
              if(newimages[0] && newimages[0].url)columna.ultimoCapitulo.imagen=newimages[0].url;
              let savedcol = await columna.save();
              console.log('updated columna',savedcol);
            }
          }
          if(oldnoticia.tipo=='capitulo' && oldnoticia.columna!=content.columna && oldnoticia.columna){
            //change old columna as new one is in other
            let oldcolum = await Columna.findOne({_id:oldnoticia.columna});
            for (x=0;x<oldcolum.capitulos.length;x++){
              if(oldcolum.capitulos==content.id){
                oldcolum.capitulos.splice(x,1);
                break;
              }
            }
            let oldcaps = await Noticia.find({_id:{'$in':oldcolum.capitulos}},null,{sort : {pubdate:-1}, limit: 1});
            if(oldcaps){
              oldcolum.ultimoCapitulo={
                imagen:oldcaps[0].imagenes[0],
                titulo:oldcaps[0].title,
                id:oldcaps[0]._id,
              }
            }
            let savedoldcol = await oldcolum.save();
            console.log('updated old columna',savedoldcol);
          }
          if(content.deleteimages){
            for (x=0;x<content.deleteimages.length;x++){
              for(let y=0;y<oldnoticia.images.length;y++){
                if(oldnoticia.images[y].url==content.deleteimages[x]){
                  oldnoticia.images.splice(y,1);
                  break;
                }
              }
            }
          }
          if(content.deleteaudios){
            for (x=0;x<content.deleteaudios.length;x++){
              for(let y=0;y<oldnoticia.audios.length;y++){
                if(oldnoticia.audios[y].url==content.deleteaudios[x]){
                  oldnoticia.audios.splice(y,1);
                  break;
                }
              }
            }
          }
          for (x=0;x<newimages.length;x++){
            oldnoticia.images.push(newimages[x]);
          }
          for (x=0;x<newaudios.length;x++){
            oldnoticia.audios.push(newaudios[x]);
          }
          let keys = Object.keys(updateobj);
          for (x=0;x<keys.length;x++){
            oldnoticia[keys[x]]=updateobj[keys[x]];
          }
          let savednoticia = await oldnoticia.save();
          console.log('updated noticia',savednoticia);
          return savednoticia;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    },
    userParseRedes: function(plaintext){
      let redes = plaintext.split(' ');
      let result = [];
      for (let x=0;x<redes.length;x+=2){
        result.push({
          red:redes[x],
          url:redes[x+1],
        });
      }
      return result;
    },
    userHashPassword: async function(password){
      //Hash password:
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      return hashedPassword;
    },
    user: async function(user){
      if(user.new){
        //check for old user:
        try {
          let olduser = await User.findOne({name:user.name});
          if(!olduser)olduser = await User.findOne({email:user.email});
          if(olduser){
            console.log('creating user forbidden: user exists',olduser)
            return false;
          }
        } catch (e) {
          console.log(e)
        }
        //create new user:
        let cdate = Date.now();
        let newUser = {
          name: user.name,
          email: user.email,
          publicEmail: user.publicEmail,
          creationDate: cdate,
          lastLogin: cdate,
          ultimaSubida: cdate,
          description: user.description,
          frequency: user.frequency,
          openstreetmap: user.openstreetmap,
          mountpoint: user.mountpoint,
        }
        //missing: redes, icon, password, url, images
        newUser.url = cleanurl(user.url);
        newUser.redes = this.userParseRedes(user.redes);
        //icon:
        if(user.icon){
          let iconurl = './public/static/logos/'+newUser.url+'.png';
          let savedimg = await saveImage(iconurl, user.icon.data, 320, 240)
          if(savedimg)newUser.icon=iconurl.substring(1);
        }
        newUser.password = await this.userHashPassword(user.password);
        //images
        let newimages = [];
        let x=0;
        if(user.deleteimages){
          //delete images from hdd BEFORE putting new one in as they could be "replaced"
          for (x=0;x<user.deleteimages.length;x++){
            let delpath = "."+user.deleteimages[x];
            if(!fs.existsSync(delpath))continue;
            //check for malformed strings:
            if(user.deleteimages[x].substring(0,'/public/files/images/'.length)!='/public/files/images/')continue;
            if(user.deleteimages[x].indexOf('..')>-1)continue;
            //should we move or just delete files?
            //move: fs.renameSync(delpath, './private/deleted'+content.deleteimages[x]);
            //delete:
            fs.unlinkSync(delpath);
          }
        }
        if(user.images){
          let imgpath = './public/files/images/'+user._id;
          if(!fs.existsSync(imgpath))fs.mkdirSync(imgpath,true);
          imgpath+='/';
          for (x=0;x<user.images.length;x++){
            let imgname = user.images[x].name;
            imgname=this.chooseNewName(imgpath,imgname);
            imgurl = imgpath.substring(1)+imgname;
            if(!imgname){
              console.log('imagename not allowed?',imgname,user.images[x]);
              continue;
            }
            let savedimg = await saveImage(imgpath+imgname, user.images[x].data, 320, 240);
            if(savedimg)newimages.push({
              url:imgurl,
              // title: user.imagetitles[x],
            });
          }
        }
        //create a new user:
        const nuser = new User(newUser);
        try{
          const savedUser = await nuser.save();
          console.log('saved user',savedUser);
          return true;
        }catch(e){
          console.log(e);
          return false;
        }

      }else{
        //update existing user:
        try {
          let olduser = await User.findOne({_id:user.id});
          if(!olduser){
            console.log('user not found:',user.id);
            return false;
          }
          let fields=['name','url','email','publicEmail','description','frequency','openstreetmap','mountpoint'];
          user.url = cleanurl(user.url);
          let updateobj={};
          for (let x=0;x<fields.length;x++){
            if(olduser[fields[x]]!=user[fields[x]]){
              updateobj[fields[x]]=user[fields[x]];
              olduser[fields[x]]=user[fields[x]];
            }
          }
          //missing: icons, redes, password
          updateobj.redes = this.userParseRedes(user.redes);
          olduser.redes=updateobj.redes;
          if(user.icon){
            let iconurl = '/public/static/logos/'+user.url+'.png';
            let savedimg = await saveImage('.'+iconurl, user.icon.data, 320, 240)
            if(savedimg){
              updateobj.icon=iconurl;
              olduser.icon=iconurl;
            }
          }
          if(user.password){
            //should we check for old password?
            //its not in the form so maybe add later on
            updateobj.password = await this.userHashPassword(user.password);
            olduser.password=updateobj.password;
          }
          console.log('updating '+user.id+' with data:',updateobj);
          let saveduser = await olduser.save();
          //let savedUser = User.findOneAndUpdate()
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    },
    columna: async function(columna){

    },
  },
  dataexport: {
    user: async function(){
      let user = await User.find();
      return user;
    }
  }
}

async function saveImage(path, data, width, height){
  console.log('save image',path,width,height);
  try {
    let savedImageToDisk = await sharp(data)
    .resize({
      width:width,
      height:height,
      withoutEnlargement: true,
      fit:'inside'})
      .toFile(path);
      return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function cleanurl(input,aditional){
  let cars = ', ;/=?:@&+$._-"\'`'
  let raw = input;
  raw = raw.toLowerCase();
  for (let x=0;x<cars.length;x++){
    if(raw.replaceAll)raw = raw.replaceAll(cars[x], '');
    else raw = replaceAll(raw,cars[x],'');
  }
  if(aditional)raw=aditional+raw;
  //output.innerText = 'https://comecuco.org/'+raw;
  return raw;
}

function replaceAll(text,target,replacement){
  let res=text;
  let pos = text.indexOf(target);
  while(pos>-1){
    res=res.substring(0,pos)+replacement+res.substring(pos+target.length);
    pos=res.indexOf(target);
  }
  return res;
}

module.exports = datacontroler;
