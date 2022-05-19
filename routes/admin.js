// admin-related stuff like adding user, deleting user etc.
const datacontroler = require('../datacontroler.js');
const templates = require('../templates.js');
const fileUpload = require('express-fileupload');

const router = require('express').Router();

router.get('/exportuser', async (req,res)=>{
      try{
        let result = await datacontroler.dataexport.user()
        //for export:
        let filename = 'user.json';
        let mimetype = 'application/json';        
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        res.send(result)
      }catch(e){
        console.log(e)
        res.status(400).send('an error occured')
      }
});


  module.exports = router;
