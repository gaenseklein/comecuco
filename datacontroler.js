const Noticia = require('./model/Noticia.js');
const User = require('./model/User.js');
const Columna = require('./model/Columna.js');
const destacada = require('./destacada.js');
const masleidos = require('./masleidos.js')
const datacontroler = {
  frontpage: async function(){
    //exporta un objeto que contiene todos datos para frontpage
    if(this.cache.frontpage)return this.cache.frontpage;
    try {

      let query={tipo: 'noticia'};
      let searchoptions = {sort : {pubdate:-1}, limit: 12};
      let nuevosarticulos = await Noticia.find(query, null, searchoptions);
      let destacada = destacada.actual();
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
      let masleidosids = masleidos.ultimos(5);
      let masleidos = [];
      if(masleidosids.length>0){
        query = {
          _id: {'$in':masleidosids};
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
      query={
        '$gt':{ultimaSubida:fechaminima}
      };
      searchoptions={sort: {ultimaSubida:-1}};
      let medios = await User.find(query, null, searchoptions);

      let newfrontpage = {
        articulos:nuevosarticulos,
        destacadas:destacadas,
        masleidos:masleidos,
        resumen:resumensemanal,
        colectivas:[produccionesColectivasVideo, produccionesColectivasAudio],
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
      return not;
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
  medio: async function(url, pagenr){
    try {
      let medio = await User.findOne({url:url});
      if(!medio){
        let date = new Date().toGMTString();
        console.log('user not found',url,date);
        return false;
      }
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
      return medios;
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
}

module.exports = datacontroler;
