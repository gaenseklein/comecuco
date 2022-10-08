const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  {useNewUrlParser:true,
   useUnifiedTopology: true},
(err)=> {
  if(err)console.log('error by connecting to db',err);
  else console.log('connected to db');
});

//const datacontroler = require('./datacontroler')

const Noticia = require('../model/Noticia.js');

async function moveAllNoticiasToFrontpage(){
  try {
    let query={tipo: 'noticia', frontpage:undefined};
    let searchoptions = {sort : {pubdate:-1}, limit: 100};
    let noticias = await Noticia.find(query)
    console.log('found noticias not on frontpage:',noticias.length);
    for(let x=0;x<noticias.length;x++){
      noticias[x].frontpage = true;
      let savednoticia = await noticias[x].save()
      console.log('moved noticia',savednoticia.title,savednoticia.frontpage);
    }

  } catch (e) {
    console.log(e)
  }
}

moveAllNoticiasToFrontpage()
