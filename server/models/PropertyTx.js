const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertyTxSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  seller: {
    type: Schema.Types.ObjectId,
      ref: 'User'
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  property: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  
});

const PropertyTx = mongoose.model('PropertyTx', propertyTxSchema);

module.exports = PropertyTx;
