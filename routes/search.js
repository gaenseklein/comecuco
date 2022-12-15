const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');

const router = require('express').Router();

router.get('/', async (req,res)=>{
      try{
        let result = ''

        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

router.post('/', async (req,res)=>{
    let allowedchars = 'abcdefghijklmnopqrstuvwxyz0123456789.:áàéèíìòóúùüäö#- '
    allowedchars+=allowedchars.toUpperCase()
      try{
        console.log(req.body.txt);
        //search for unallowed char:
        let searchwords = req.body.txt;
        for(let i=0;i<searchwords.length;i++){
          if(allowedchars.indexOf(searchwords[i])==-1){
            return res.status(400).send('no se encuentra nada')
          }
        }
        let data = await datacontroler.search(searchwords)
        let result = templates.buildPage('search',data)
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});

module.exports = router;
