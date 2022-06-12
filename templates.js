const raw = {
  quienessomos: require('./templates/quienessomos.js'),
  frontpage: require('./templates/frontpage.js'),
  noticia: require('./templates/noticia.js'),
  dash: require('./templates/dash.js'),
  columna: require('./templates/columna.js'),
  resumensemanal: require('./templates/resumensemanal.js'),
  todascolumnas: require('./templates/todascolumnas.js'),
  form:{
    usuario: require('./templates/forms/usuario.js'),
    iniciar: require('./templates/forms/iniciosesion.js'),
    noticia: require('./templates/forms/noticia.js'),
    columna: require('./templates/forms/columna.js'),
  },
}

const templates = {
  buildPage: function(pagename,data){
    if(raw[pagename])return raw[pagename](data);
  },
  buildForm: function(formname,data){
    if(raw.form[formname]){
      if(data)return raw.form[formname](data);
      else return raw.form[formname]({
        name:'',url:'',description:'',
        email:'',publicEmail:'',redes:[],
        mountpoint:'',_id:''
      })
    }else{
      return this.buildError(404);
    }
  },
  buildError: function (nr){
    return 'oops, something went wrong';
  },

}

module.exports = templates;
