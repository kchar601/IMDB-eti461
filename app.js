const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express()
const port = 80
app.use(express.static('public'))

app.get('/getDB', function(req,res){
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

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})
