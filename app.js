const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express()
const port = 80
app.use(express.static('public'))

app.get('/getMovies', function(req,res){
 res.setHeader('Content-Type', 'application/json');
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.uri;
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    await client.connect();
    const dbo = client.db("movies");
    await dbo.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const items = await dbo.collection("movies").find({}).toArray();
    console.log(JSON.stringify(items));
    res.json(items);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
})

app.get('/getDirectors', function(req,res){
  res.setHeader('Content-Type', 'application/json');
 const { MongoClient, ServerApiVersion } = require("mongodb");
 const uri = process.env.uri;
 const client = new MongoClient(uri,  {
         serverApi: {
             version: ServerApiVersion.v1,
             strict: true,
             deprecationErrors: true,
         }
     }
 );
 async function run() {
   try {
     await client.connect();
     const dbo = client.db("movies");
     await dbo.command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
     const items = await dbo.collection("directors").find({}).toArray();
     console.log(JSON.stringify(items));
     res.json(items);
   } finally {
     await client.close();
   }
 }
 run().catch(console.dir);
 })

 app.get('/getActors', function(req,res){
  res.setHeader('Content-Type', 'application/json');
 const { MongoClient, ServerApiVersion } = require("mongodb");
 const uri = process.env.uri;
 const client = new MongoClient(uri,  {
         serverApi: {
             version: ServerApiVersion.v1,
             strict: true,
             deprecationErrors: true,
         }
     }
 );
 async function run() {
   try {
     await client.connect();
     const dbo = client.db("movies");
     await dbo.command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
     const items = await dbo.collection("actors").find({}).toArray();
     console.log(JSON.stringify(items));
     res.json(items);
   } finally {
     await client.close();
   }
 }
 run().catch(console.dir);
 })

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})

/* This is what ChatGPT spit out for the sessions using mongoDb, node and express. We just have to connect the database


// connect to mongo database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// create user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// create express app
const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// set up session
app.use(session({
  secret: 'myappsecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 3600000 } // 1 hour
}));

// handle login request
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // check if user exists in database
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // check if password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).send('Invalid email or password');
    return;
  }

  // start session
  req.session.user = user;
  res.cookie('myappsession', req.session.id, { maxAge: 3600000 }); // set session id as cookie

  res.send('Logged in');
});

// handle logout request
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('myappsession');
  res.send('Logged out');
});

// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});




*/