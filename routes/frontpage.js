// displays the frontpage
const datacontroler = require('../datacontroler.js');
//const templates = require('../templates.js');

const router = require('express').Router();
router.get('/', async (req,res)=>{
  try {
    let data = await datacontroler.frontpage();
    let response='';
    //response = templates.buildPage('frontpage',data);
    res.send(response);
  } catch (e) {
    console.warn(e);
    res.status(400).send('oops, something went wrong');
  }
});
module.exports = router;
