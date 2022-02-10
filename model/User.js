const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    //required:false,
    min:6,
    max:255,
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



});

module.exports = mongoose.model('User',userSchema);
