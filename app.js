require('dotenv').config();
// Import the express module
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.port || 4000;
// Create an instance of express
const app = express();
const mongoose = require('mongoose');
const UserRoute = require('./api/routes/users');
const JobsRoute = require('./api/routes/jobs');

mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));



// body parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.disable('etag');

// CORS SETUP
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      res.status(200).json({});
  } else {
      next();
  }
});

app.use('/user', UserRoute);
app.use('/jobs', JobsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});