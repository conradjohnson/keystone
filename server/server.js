const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const {updatePropertyPics} = require('./utils/updateImg');
const { typeDefs, resolvers } = require('./schemas');
//const upload = require('./utils/uploadMiddleware');
const resize = require('./utils/resize');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: "bounded"
});
const multer = require('multer');
const storage = multer.diskStorage({ 
  destination: function(req, file, cb) {
   
      cb(null,  path.join(__dirname, '/uploads'))
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
});
const upload = multer({ storage })




app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/api/image-upload', upload.single('image'), async (req, res) => {

  //Can't get resize to work properly
  // crashes server each time
  // const imagePath = path.join(__dirname,'./uploads');
  // const fileUpload = new resize(imagePath);
  // if (!req.file) {
  //   res.status(401).json({error: 'Please provide an image'});
  // }
  // const filename = await fileUpload.save(req.file.buffer);

  const filename = req.file.filename;
  const propid = req.body.propid;
  
  await updatePropertyPics(propid, filename);
 // Save this data to a database probably
 console.log('POST request received to /image-upload.');
 console.log(filename)
 res.send({filename: filename})
  //return 
  // const fileUpload = new resize(imagePath);
})


// Serve up static assets
app.use('/img/prop', express.static(path.join(__dirname, '/uploads')));
// Serve up static assets
app.use('/img', express.static(path.join(__dirname, '../client/public/img')));



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} 

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});




// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
