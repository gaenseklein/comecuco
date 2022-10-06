const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  url:{
    type: String,
  },
  descripcion: {
    type: String,
    maxLength:255,
    required: true,
  },
  image: {
    type: String,
    maxLength:255,
  },
  pubdate: {
    type: Date,
    default: Date.now,
  },
  inicio:{
    type: Date,
    default: Date.now,
    required: true

  },
  fin:{
    type: Date,
    default: Date.now,
    required: true
  },
});

module.exports = mongoose.model('Publicidad',Schema);
