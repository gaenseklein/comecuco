//user related stuff: login, logout,
//(subir noticia, editar noticia etc. tb aqui?)...
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const fileUpload = require('express-fileupload');

const router = require('express').Router();
/*
router.get('/iniciar', async (req,res)=>{
  try{
    let loginpage = templates.buildForm('iniciar');
    res.send(loginpage);
    return;
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});
router.post('/iniciar', async (req,res)=>{

  try{
    console.log(req.body);
    let token = await datacontroler.iniciarSession(req.name, req.password);
    // console.log('token:',token,'req.name',req.body.name, req.body.password);
    if(!token){
      res.status(400).send('error on login');
      return;
    }
    res.cookie('jwt', token, {maxAge: 6*60*60*1000});
    res.redirect('/user/')
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});

router.get('/cerrar', async (req,res)=>{
  try{
    res.clearCookie('jwt');
    res.redirect('/');
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});
*/
router.get('/nuevo', async (req,res)=>{
  let response = templates.buildForm('usuario');
  try{
    res.send(response);
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});
router.get('/cambia/', async (req,res)=>{
  if(!req.user){
    res.status('400').send('accesso prohibido');
    return;
  }
  try{
    console.log('user asks for change:',req.user)
    let data = await datacontroler.usuario(req.user._id,false,true);
    if(!data){
      res.status(404).send('user not found '+req.user._id);
      return;
    }
    let response = templates.buildForm('usuario',data);
    res.send(response);
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});

router.get('/cambia/:url', async (req,res)=>{
  try{
    let data = await datacontroler.medio(req.params.url,false,true);
    if(!data){
      res.status(404).send('user not found '+req.params.url);
      return;
    }
    let response = templates.buildForm('usuario',data);
    res.send(response);
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});

router.post('/cambia/', fileUpload(), async (req,res)=>{
  try{
    console.log('body:',req.body);
    console.log('files:',req.files);
    let user = {
      name: req.body.name,
      email: req.body.email,
      url: req.body.url,
      publicEmail: req.body.emailpublico,
      description: req.body.description,
      frequency: req.body.frequency,
      openstreetmap: req.body.openstreetmap,
      mountpoint: req.body.mountpoint,
      redes: req.body.redes,
    };
    if(req.body.password && req.body.password.length>0){
      user.password=req.body.password
    }
    if(req.files && req.files.icon){
      user.icon=req.files.icon;
    }
    user.new=(req.body.uid=='');
    if(!user.new){
      user.id=req.body.uid;
      if(req.files && req.files.foto){
        user.images=[req.files.foto];
      }
    }
    console.log('user:',user);
    let userdata = await datacontroler.datainput.user(user);
    if(userdata)res.send('okay');
    else res.send('not okay');
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});

router.get('/',async (req,res)=>{
  //dashboard:
  try {
    let data = await datacontroler.dashboard(req.user)
    if(data)console.log('data fetched',data);
    let page = templates.buildPage('dash',data)
    res.send(page)
  } catch (e) {
    console.log('dashboard went wrong',e)
    res.status(400).send('an error occured')
  }
});

router.get('/noticia', async (req,res)=>{
      try{
        console.log('noticia get');
        let data = await datacontroler.editarNoticia(false,req.user._id)
        console.log('noticia data:',(data!=false));
        let result = templates.buildForm('noticia',data)
        console.log('send result');
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.get('/noticia/:id',async (req,res)=>{
  //edit noticia
  console.log('noticia:',req.params.id);
  try {
    let data = await datacontroler.editarNoticia(req.params.id, req.user._id)
    if(!data)return res.status(400).send('did not work')
    console.log('alltags:',data.alltags);
    let page = templates.buildForm('noticia',data);
    res.send(page);
  } catch (e) {
      console.log('editar noticia',e);
      res.status(400).send('an error occured')
  }
})
router.post('/noticia', fileUpload(), async (req,res)=>{
  //edit noticia
  console.log('noticia llegado')
  // console.log(req.body, req.files);
  let content = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.autor,
    body: req.body.body,
    resumen: req.body.resumen,
    tipo: req.body.tipo,
    columna: req.body.columna,
    tags: req.body.tags,
    pubdate: req.body.fecha,
    isnew: (req.body.isnew=='true'),
    id: req.body.id,
    numero: req.body.numero,
    // deleteimages: req.body.deleteimages,
    // deleteaudios: req.body.deleteaudios,
  }
  if(req.body.eliminarfotos){
    if(typeof req.body.eliminarfotos == 'string'){
      console.log('delete one image');
      content.deleteimages = [req.body.eliminarfotos]
    }else{
      content.deleteimages = req.body.eliminarfotos
    }
  }
  if(req.body.eliminaraudios){
    if(typeof req.body.eliminaraudios == 'string'){
      console.log('delete one audio');
      content.deleteaudios = [req.body.eliminaraudios]
    }else{
      content.deleteaudios = req.body.eliminaraudios
    }
  }
  console.log('delete images:',req.body.eliminarfotos);
  console.log('typeof eliminarfotos:',typeof req.body.eliminarfotos);
  console.log('content is new?',content.isnew);
    //images
    if(req.files){
      let cimages=[]
      let caudios=[]
      let cimagetitles=[]
      for(let x=1;x<=4;x++){
        if(req.files['foto'+x]){
          cimages.push({
            filename:req.files['foto'+x].name,
            data:req.files['foto'+x].data,
          })
          if(x==1)cimagetitles.push(req.body.fototext);
          else cimagetitles.push('')
        }
        if(req.files['audio'+x])caudios.push({
          filename:req.files['audio'+x].name,
          data:req.files['audio'+x].data,
          mimetype: req.files['audio'+x].mimetype,
        })
      }
      if(cimages.length>0)content.images=cimages;
      if(caudios.length>0)content.audios=caudios;
      content.imagetitles=cimagetitles;
    }
  console.log('content created');
  let save = await datacontroler.datainput.noticia(content, req.user);
  console.log('saved content:',save);
  if(!save)return res.send('not okay :(')
  res.redirect('/user');
  // res.send('okay? '+save)
})
router.get('/columna', async (req,res)=>{
      try{
        console.log('nueva columna');
        let result = templates.buildForm('columna', {new:true, autor: req.user.name, autorId: req.user._id})
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.get('/columna/:id', async (req,res)=>{
      try{
        console.log('getting columna',req.params.id);
        let data = await datacontroler.columnaById(req.params.id)
        if(!data){
          res.send('columna not found')
          return;
        }
        let searchobj = {
          autor: req.user.name,
          autorId: req.user._id,
          title: data.title,
          descripcion: data.descripcion,
          selectedAutor: data.author,
          id: data._id,
          url: data.url,
        }
        console.log('obj',searchobj,data);
        let result = templates.buildForm('columna', searchobj)
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.post('/columna', fileUpload(), async (req,res)=>{
      try{
        let updobj = {
          title: req.body.title,
          url: req.body.url,
          author: req.body.autor,
          descripcion:req.body.descripcion,
          authorId: req.user._id,
        }
        console.log('something went terrible wrong',req.body);
        if(req.body.id && req.body.id.length>0)updobj.id = req.body.id
        console.log('posting columna',updobj);
        let savedColumna = await datacontroler.datainput.columna(updobj)
        if(!savedColumna){
          return res.send('something went wrong...')
        }
        let result = 'columna guardado'
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

router.get('/list', async (req,res)=>{
    console.log('userlist');
      try{
        let data = await datacontroler.userlist()
        console.log('user:',data);
        if(!data)return res.status(404).send('oops')
        let result = templates.buildPage('userlist',data)

        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

router.get('/borrar/noticia/:nid', async (req,res)=>{
      try{
        let data = await datacontroler.noticia(req.params.nid)
        if(!data)return res.status(404).send('article not found')
        let result = templates.buildForm('borrar',data)

        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

module.exports = router;
