const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
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
  pubdate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated:{
    type: Date,
    default: Date.now
  },
  capitulos:[{
    id: mongoose.ObjectId,
  }],
});

module.exports = mongoose.model('Columna',Schema);
