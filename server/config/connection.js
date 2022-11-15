const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//prod: REACT_APP_MONGODB_URI
//test: REACT_APP_TESTMONGO_URI
//"mongodb://127.0.0.1:27017/keystone"
mongoose.connect(process.env.REACT_APP_TESTMONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
