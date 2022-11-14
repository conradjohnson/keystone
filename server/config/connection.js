const mongoose = require('mongoose');
//const dotenv = require('dotenv');
//dotenv.config();
//prod: MONGODB_URI 
//test: TESTMONGO_URI
"mongodb://127.0.0.1:27017/keystone"
mongoose.connect("mongodb://127.0.0.1:27017/keystone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
