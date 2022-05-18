// accesso api por dash y tal
const datacontroler = require('../datacontroler.js');
const Destacada = require('../destacada.js')
//const templates = require('../templates.js');

const router = require('express').Router();
router.post('/destacada', async (req,res)=>{
  try {
    let existoso = Destacada.cambiaDestacada(req.body.mes, req.body.valor)
    res.json({existoso:existoso})    
  } catch (e) {
    console.warn(e);
    res.json({error:true});
  }
});
module.exports = router;
