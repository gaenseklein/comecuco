const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    maxLength:255
  },
  subtitle: {
    type: String,
    maxLength:255,
  },
  author: {
    type: String,
    maxLength:255,
  },
  idDeAutor:{
    type: mongoose.ObjectId
  },
  pubdate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated:{
    type: Date,
    default: Date.now
  },
  body:{
    type: String,
    required: true,
  },
  resumen:{
    type: String,
  },
  image:{
    type: String,
  },
  imageTitle:{
    type: String,
    maxLength: 255,
  },
  audios:[{
    url: String,
    description: String,
    id: mongoose.ObjectId,
  }],
  tags: [
    type: String
  ],
  tipo: {
    type: String //noticia, capitulo, resumensemanal
  },
});

module.exports = mongoose.model('Noticia',counterSchema);
