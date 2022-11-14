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
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  description: {
    type: String
  },
  yearBuilt:{
    type:Number
  },
  sqft:{
    type:Number
  },
  images: [{
    type: String
  }],
  isNft:{
    type: Boolean,
    default: false
  },
  nftUri:{
    type: String,
    trim: true
  },
  nftTokenId:{
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
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
