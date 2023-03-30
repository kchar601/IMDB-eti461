const express = require('express');
const { fstat } = require('fs');
const bcrypt = require("bcryptjs");
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
    //console.log(JSON.stringify(items));
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
 
  async function run() {
    try {
      await client.connect();
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const items = await dbo.collection("users").findOne({username: req.body.username}).toArray();
      console.log(JSON.stringify(items));
      const result = res.json(items);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

  const saltRounds = 5;
  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError
    } else {
      bcrypt.hash(req.body.password, salt, function(hashError, hash) {
        if (hashError) {
          throw hashError
        } else {
          if(hash == result.password){
            console.log("passwords match");
            return true;
          }
          else{
            return false;
          }
        }
      })
    }
  })
})



const password = "Eti461!";
const saltRounds = 5;

bcrypt.genSalt(saltRounds, function (saltError, salt) {
  if (saltError) {
    throw saltError
  } else {
    bcrypt.hash(password, salt, function(hashError, hash) {
      if (hashError) {
        throw hashError
      } else {
        console.log(hash);
      }
    })
  }
})