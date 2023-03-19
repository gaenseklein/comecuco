const mongoose = require('mongoose'); //este es el objeto que se conecta a la base de datos

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    //required:false,
    min:6,
    max:255,
  },
  url:{
    type: String,
  },
  email:{
    type: String,
    required:true,
    min:6,
    max:255,
  },
  publicEmail:{
    type: String,
    required:true,
    min:6,
    max:255,
  },
  password:{
    type: String,
    required:true,
    max:1024,
    min: 6
  },
  creationDate:{
    type: Date,
    default: Date.now
  },
  lastLogin:{
    type: Date,
    default: Date.now
  },
  ultimaSubida:{
    type: Date,
    default: Date.now
  },
  description:{
    type: String,
  },
  icon:{
    type: String,
  },
  frequency:{
    type: String,
  },
  openstreetmap:{
    type: String,
  },
  mountpoint:{
    type: String,
  },
  redes:[
    {
      red: String,
      url: String,
    }
  ],
  images:[
    String
  ],
  imagetitles:[
    String
  ],
  drupalid: {
    type: String,
  }
});

module.exports = mongoose.model('User',userSchema); //construye un objeto model.User con el esquema de userSchema
