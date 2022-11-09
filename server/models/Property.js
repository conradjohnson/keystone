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
    required: true,
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
  value: {
    type: Float
  },
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  forSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Float,
    default: -1
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
