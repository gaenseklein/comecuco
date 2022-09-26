// accesso api por dash y tal
const datacontroler = require('../datacontroler.js');
const Destacada = require('../destacada.js')
const Tags = require('../tags.js')
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

router.get('/tags', async (req,res)=>{
      try{
        let result = Tags.allTags().split(',')

        res.json(result)
      }catch(e){
        console.warn(e);
        res.json({error:true});
      }
});
router.post('/tags/nuevo', async (req,res)=>{
  try {
    let existoso = Tags.addTags([req.body.tag])
    res.json({existoso:existoso})
  } catch (e) {
    console.warn(e);
    res.json({error:true});
  }
});

router.post('/tags/cambia', async (req,res)=>{
  try {
    let existoso = Tags.cambiaTag(req.body.viejo, req.body.nuevo)
    res.json({existoso:existoso})
  } catch (e) {
    console.warn(e);
    res.json({error:true});
  }
});

router.post('/tags/borrar', async (req,res)=>{
  try {
    let existoso = Tags.removeTag(req.body.tag)
    res.json({existoso:existoso})
  } catch (e) {
    console.warn(e);
    res.json({error:true});
  }
});
module.exports = router;
