const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Property = require('./Property');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type:String,
    trim:true
  },
   email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  wallet: {
    type: String,
    required: false,
    minlength: 5
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],

});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
