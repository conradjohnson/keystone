const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertyTxSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  seller: {

  },
  buyer: {

  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const PropertyTx = mongoose.model('PropertyTx', propertyTxSchema);

module.exports = PropertyTx;
