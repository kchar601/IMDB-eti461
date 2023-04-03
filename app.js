const express = require('express');
const { fstat } = require('fs');
const bcrypt = require("bcryptjs");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
var cookie = require('cookie');
const app = express()
const port = 80
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  var user = {username: req.body.username};
  //var pswd = {password: req.body.password};
  //console.log(user);
  //console.log(pswd);

  
  async function run() {
    try {
      await client.connect();
      const dbo = client.db("Users");
      await dbo.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
      const result = await dbo.collection("users").findOne(user);
      if (result) {
        console.log(result);
        const passwordMatch = await bcrypt.compare(req.body.password, result.password);
        if (passwordMatch) {
          console.log("passwords match");
          res.cookie("user", result.username,           
          { 
            maxAge: 1000*60*60*24, //one day
            //httpOnly: true 
          });
          res.cookie("pass", result.password,
          { 
            maxAge: 1000*60*60*24, //one day
            //httpOnly: true 
          });
          res.json([true, "user=" + result.username + "&pass=" + result.password]);
        } else {
          console.log("passwords don't match");
          res.json([false]);
        }
      } else {
        console.log("user not found");
        res.json([false]);
      };
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/attemptRegister', async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const bcrypt = require("bcrypt");
  const uri = process.env.uri;
  const client = new MongoClient(uri,  {
          serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
          }
      }
  );
  var fName = {Fname: req.body.Fname};
  var lName = {Lname: req.body.Lname};
  var user = {username: req.body.username};
  var pswd = {password: req.body.password};
  var email = {email: req.body.email};
  console.log(fName);
  console.log(lName);
  console.log(user);
  console.log(pswd);
  console.log(email);
  
  try {
    await client.connect();
    const dbo = client.db("Users");
    await dbo.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const result = await dbo.collection("users").find({$or: [user, email]}).toArray();
    if (result.length > 0) {
      if (result.some(doc => doc.username === user.username)) {
        res.json({success: false, message: "Username already exists"});
      } else if (result.some(doc => doc.email === email.email)) {
        res.json({success: false, message: "Email already exists"});
      }
    } else {
      const hashedPassword = await bcrypt.hash(pswd.password, 10);
      console.log(hashedPassword);
      await dbo.collection("users").insertOne({...fName, ...lName, ...user, password: hashedPassword, ...email, role: "user"});
      res.json({success: true});
    };
  } catch (err) {
    console.error(err);
    res.json({success: false, message: "An error occurred"});
  } finally {
    await client.close();
  }
});
