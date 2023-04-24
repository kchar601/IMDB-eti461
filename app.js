const express = require('express');
const { fstat } = require('fs');
const bcrypt = require("bcryptjs");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
var cookie = require('cookie');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getMovies', async function(req,res){
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
  try {
      await client.connect();
      const dbo = client.db("movies");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const items = await dbo.collection("movies").find({}).toArray();
      res.json(items);
  } finally {
      await client.close();
  }
});

app.get('/getSortedMovies', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }); 
  const aggr = JSON.parse(req.query.agg);  
  console.log('Received aggregation pipeline:', JSON.stringify(aggr));
  try {
    await client.connect();
    const dbo = client.db('movies');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    const coll = client.db('movies').collection('movies');
    const cursor = coll.aggregate(aggr);
    const result = await cursor.toArray();
    res.json(result);
  } finally {
    await client.close();
  }
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
  }); 

 async function run() {
   try {
     await client.connect();
     const dbo = client.db("movies");
     await dbo.command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
     const items = await dbo.collection("directors").find({}).toArray();
     res.json(items);
   } finally {
     await client.close();
   }
 }

 run().catch(console.dir);
 })

 app.get('/getSortedDirectors', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }); 
  const aggr = JSON.parse(req.query.agg);  
  console.log('Received aggregation pipeline:', JSON.stringify(aggr));
  try {
    await client.connect();
    const dbo = client.db('movies');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    const coll = client.db('movies').collection('directors');
    const cursor = coll.aggregate(aggr);
    const result = await cursor.toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});


app.post('/updateDirector', async function(req,res){
  res.setHeader('Content-Type', 'application/json');
    const { MongoClient, ServerApiVersion, BSON } = require('mongodb');
    const uri = process.env.uri;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  
    try {
      await client.connect();
      const dbo = client.db('movies');
      await dbo.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
      const director = req.body.director;
      const id = new BSON.Int32(req.body.id); // Convert the ID to an Int32 object
      console.log('Updating actor with id:', id);
      const result = await dbo.collection('directors').updateOne({ id: id }, { $set: director });
      console.log('Update result:', result);
      res.json(result);
    } finally {
      await client.close();
    }
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
     res.json(items);
   } finally {
     await client.close();
   }
 }
 run().catch(console.dir);
 })

app.get('/getSortedActors', async function(req,res){
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }); 
  const aggr = JSON.parse(req.query.agg);  
  console.log('Received aggregation pipeline:', JSON.stringify(aggr));
  try {
    await client.connect();
    const dbo = client.db('movies');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    const coll = client.db('movies').collection('actors');
    const cursor = coll.aggregate(aggr);
    const result = await cursor.toArray();
    res.json(result);
  } finally {
    await client.close();
  }
})

app.get('/getAwards', async function(req,res){
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
     const items = await dbo.collection("actorAwards").find({}).toArray();
     res.json(items);
   } finally {
     await client.close();
   }
 }
 run().catch(console.dir);
})

app.get('/getUser', function(req,res){
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
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const username = req.query.username;
      const items = await dbo.collection("users").find({"username": username}).toArray();
      res.json(items);
  } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.get('/getUsers', function(req,res){
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
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const items = await dbo.collection("users").find({}).toArray();
      res.json(items);
  } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

app.post('/checkLogin', function(req, res){
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
  var user = {username: req.body.username};
  
  async function run() {
    try {
      await client.connect();
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      const result = await dbo.collection("users").findOne(user);
      if (result) {
        const passwordMatch = await bcrypt.compare(req.body.password, result.password);
        if (passwordMatch) {
          //console.log("passwords match");
          res.cookie("user", result.username,           
          { 
            maxAge: 1000*60*60*24, //one day
          });
          res.cookie("pass", result.password,
          { 
            maxAge: 1000*60*60*24, //one day
          });
          res.cookie("role", result.role,           
          { 
            maxAge: 1000*60*60*24, //one day
          });
          res.json([true, "user=" + result.username + "&pass=" + result.password]);
        } else {
          //console.log("passwords don't match");
          res.json([false]);
        }
      } else {
        //console.log("user not found");
        res.json([false]);
      };
    } catch (err) {
      //console.error(err);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/attemptRegister', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const bcrypt = require('bcrypt');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  var fName = { Fname: req.body.Fname };
  var lName = { Lname: req.body.Lname };
  var user = { username: req.body.username };
  var pswd = { password: req.body.password };
  var email = { email: req.body.email };

  try {
    await client.connect();
    const dbo = client.db('Users');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const result = await dbo.collection('users').find({ $or: [user, email] }).toArray();
    if (result.length > 0) {
      if (result.some(doc => doc.username === user.username)) {
        res.json({ success: false, message: 'Username already exists' });
      } else if (result.some(doc => doc.email === email.email)) {
        res.json({ success: false, message: 'Email already exists' });
      }
    } else {
      const hashedPassword = await bcrypt.hash(pswd.password, 10);
      await dbo.collection('users').insertOne({ ...fName, ...lName, ...user, password: hashedPassword, ...email, role: 'user', emailConfirm: false });
      res.json({ success: true });
    };
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'An error occurred' });
  } finally {
    await client.close();
  }

  const text = `<img src="IMDBLogo.png" alt="IMDB-Logo"><h2>Click the link below to confirm your email address</h2>
  <a href="http://localhost:3000/emailConfirmation.html?user=${user.username}">Confirm Email</a>`;
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
    
  
    const info = await transporter.sendMail({
      from: 'imbd.dev@gmail.com',
      to: email.email,
      subject: 'Email Confirmation',
      html: text,
    });
  
    console.log("Message sent: " + info.messageId);
  
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})

app.post('/updateMovie', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      },
      
    });
    
    try {
      await client.connect();
      const dbo = client.db('movies');
      await dbo.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
      const movie = req.body.movie;
      const result = await dbo.collection('movies').updateOne({id: req.body.id}, {$set: movie});
      res.json(result);
    }
    finally {
      await client.close();
    }
    
  });

  app.post('/updateActor', async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const { MongoClient, ServerApiVersion, BSON } = require('mongodb');
    const uri = process.env.uri;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  
    try {
      await client.connect();
      const dbo = client.db('movies');
      await dbo.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
      const actor = req.body.actor;
      const id = new BSON.Int32(req.body.id); // Convert the ID to an Int32 object
      console.log('Updating actor with id:', id);
      const result = await dbo.collection('actors').updateOne({ id: id }, { $set: actor });
      console.log('Update result:', result);
      res.json(result);
    } finally {
      await client.close();
    }
  });
  

app.post('/search', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const value = req.params.value;
  const collections = ['movies', 'directors', 'actors']; // add collection names here

  try {
    await client.connect();
    const dbo = client.db('movies');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    let result = [];
    for (const collection of collections) {
      const cursor = dbo.collection(collection).find({ $text: { $search: value } });
      const items = await cursor.toArray();
      if (items.length > 0) {
        result.push({ collection: collection, items: items });
      }
    }
    res.json(result);
  } finally {
    await client.close();
  }
});

app.post('/confirmEmail', async function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.uri;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const user = { username: req.body.username };
  const confirm = { emailConfirm: true };

  try {
    await client.connect();
    const dbo = client.db('Users');
    await dbo.command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const result = await dbo.collection('users').updateOne(user, { $set: confirm });

    if (result.matchedCount > 0 && result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch(err) {
    console.error(err);
    res.json({ success: false });
  } finally {
    await client.close();
  }
})

app.post('/deleteUser', async function(req, res) {
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
  let del = {};
  if(req.body.id){
    del= {id: req.body.id};
    console.log(del);
  } else if(req.body.username){
    del = {username: req.body.username};
    console.log(del);
  } else {
    console.log("No id or username provided");
    res.json({success: false});
    return;
  }
  async function run() { 
    try {
      await client.connect();
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const result = await dbo.collection("users").deleteOne(del);
      console.log("Delete result:", result);
      if(result.deletedCount>0){
        res.json({success: true});
      } else {
        res.json({success: false});
      }
    } catch(err) {
      console.error(err);
      res.json({success: false});
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})



