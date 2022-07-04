// displays public pages:
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');

const router = require('express').Router();
//frontpage:
router.get('/', async (req,res)=>{
  try {
    let data = await datacontroler.frontpage();
    let response='hello';
    response = templates.buildPage('frontpage',data);
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
    let data = await datacontroler.columnas(true);
    let response='hello';
    response = templates.buildPage('todascolumnas',data);
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
    console.log('columna con data:',data);
    response = templates.buildPage('columna',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
router.get('/resumensemanal', async (req,res)=>{
  try {
    let data = await datacontroler.resumensemanal();
    // let response='hello';
    response = templates.buildPage('resumensemanal',data);
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
router.get('/todaslasnoticias', async (req,res)=>{
      try{
        let result = ''
        let data = await datacontroler.noticias()
        if(!data){
          res.status(404).send('oops, not found')
          return;
        }

        result = templates.buildPage('todaslasnoticias', {data:data})
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.get('/todaslasnoticias/:pagenr', async (req,res)=>{
      try{
        let result = ''
        let data = await datacontroler.noticias(req.params.pagenr)
        if(!data){
          res.status(404).send('oops, not found')
          return;
        }
        result = templates.buildPage('todaslasnoticias', {data:data, pagenr:req.params.pagenr})
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
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

router.get('/envivo', async (req,res)=>{
      try{
        let data = await datacontroler.quienessomos()
        let result = templates.buildPage('app',data.medios)
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.get('/envivo/:radioid', async (req,res)=>{
      try{
        let result = templates.buildPage('app',null)
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});
router.get('/app/redes', async (req,res)=>{
      try{
        let data = await datacontroler.quienessomos()
        let result = templates.buildPage('appRadiostations',data.medios)
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

module.exports = router;
