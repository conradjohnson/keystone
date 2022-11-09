const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//prod: process.env.MONGODB_URI 

mongoose.connect(process.env.TESTMONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
