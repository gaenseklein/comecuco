//user related stuff: login, logout,
//(subir noticia, editar noticia etc. tb aqui?)...
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');

const router = require('express').Router();
router.get('/', async (req,res)=>{
  try{
    let loginpage = templates.buildForm('iniciar');
    res.send(loginpage);
    return;
  }catch(e){
    console.warn(e);
    res.status(400).send('error');
  }
});
router.post('/', async (req,res)=>{

  try{
    console.log('body:',req.body);
    let token = await datacontroler.iniciarSession(req.body.name, req.body.password);
     console.log('token:',token,'req.name',req.body.name, req.body.password);
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

module.exports = router;
