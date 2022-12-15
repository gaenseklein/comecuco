const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    maxLength: 255
  },
  url:{
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    maxLength:255,
  },
  author: {
    type: String,
    maxLength:255,
  },
  authorId: {
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
  capitulos:[{
    type: mongoose.ObjectId,
  }],
  ultimoCapitulo:{
    imagen: String,
    titulo: String,
    // url: String,
    id: mongoose.ObjectId,
  },
});

schema.index({'$**': 'text'}, {default_language: "spanish" });

module.exports = mongoose.model('Columna',schema);
