const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    default: 'USA',
    trim: true
  },
  zip: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  },
  value: {
    type: Number
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  isNft:{
    type: Boolean,
    default: false
  },
  NftUri:{
    type: String,
    trim: true
  },
  forSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    default: -1
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
