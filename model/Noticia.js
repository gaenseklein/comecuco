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
  images:[{
    url: String,
    title: String,
  }],
  audios:[{
    url: String,
    description: String,
  }],
  videolink:{
    url: String,
    iframe: String,
  },
  tags: [
    String
  ],
  tipo: {
    type: String //noticia, capitulo, resumensemanal
  },
  numero: { //usado en resumen semanal
    type: String,
  },
  columna:{
    type: mongoose.ObjectId
  },
  frontpage:{
    type: Boolean,
    default: true,
  },
});

counterSchema.index({'$**': 'text'}, {default_language: "spanish" });

module.exports = mongoose.model('Noticia',counterSchema);
