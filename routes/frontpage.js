// displays public pages:
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');

const router = require('express').Router();
//frontpage:
router.get('/', async (req,res)=>{
  try {
    let data = await datacontroler.frontpage();
    let response='hello';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/quienessomos', async (req,res)=>{
  try {
    let data = await datacontroler.quienessomos();
    let response='hello';
    response = templates.buildPage('quienessomos',data);
    // res.send(JSON.stringify(data));
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/columnas', async (req,res)=>{
  try {
    let data = await datacontroler.columnas();
    let response='hello';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/columna/:id', async (req,res)=>{
  try {
    let data = await datacontroler.columna(req.params.id);
    let response='hello';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/resumensemanal', async (req,res)=>{
  try {
    let data = await datacontroler.frontpage();
    let response='hello';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/noticia/:id', async (req,res)=>{
  try {
    let data = await datacontroler.noticia(req.params.id);
    if(!data){
      res.status(404).send('oops, not found')
      return;
    }
    let response= templates.buildPage('noticia',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/medio/:url', async (req,res)=>{
  try {
    let data = await datacontroler.medio(req.params.url);
    let response='hello';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});

module.exports = router;
