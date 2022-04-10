//user related stuff: login, logout,
//(subir noticia, editar noticia etc. tb aqui?)...
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const fileUpload = require('express-fileupload');

const router = require('express').Router();
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
module.exports = router;
