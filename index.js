//dependencias
const express = require('express'); //biblioteca que construye un servidor
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs'); //sistema de archivos, es pate de node js

//Import routes

const adminRoute = require('./routes/admin');
const fpRoute = require('./routes/public');
const notesRoute = require('./routes/notes');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const searchRoute = require('./routes/search');
const auth = require('./routes/auth');
const api = require('./routes/api');
//initializa dotenv:

dotenv.config();

//implementa destacada:
const destacada = require('./destacada.js');
destacada.init();
//implementa tags:
const tags = require('./tags.js');
tags.init();

mongoose.set('useCreateIndex', true);
//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  {useNewUrlParser:true,
   useUnifiedTopology: true},
(err)=> {
  if(err)console.log('error by connecting to db',err);
  else console.log('connected to db');
});

//Route Middlewares
app.use(express.json({limit: '50mb'}));
// app.use('/admin',adminRoute);
app.use('/',fpRoute);
// app.use('/noticia',notesRoute);
app.use('/search',express.urlencoded({extended:false}),searchRoute);
app.use('/iniciar',express.urlencoded({extended:false}),loginRoute);
app.use('/user',auth, express.urlencoded({extended:true}),userRoute);
//app.use('/user', express.urlencoded({extended:true}),userRoute);
app.use('/api', auth, express.json({limit: '50mb'}),api);
app.use('/admin',auth,adminRoute)

//serving static-files for test-purpose / can be served directly by nginx
app.use('/public', express.static('./public'));

//start listening server
app.listen(3033,() => console.log('server up and running at port',3033));
