const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express()
const port = 80
app.use(express.static('public'))

app.get('/getDB', function(req,res){
 res.setHeader('Content-Type', 'application/json');
const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://admin:6QyiaAdKZRKfBhBu@imbd.jzxx6gl.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const dbo = client.db("movies");
    await dbo.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const items = await dbo.collection("movies").find({}).toArray();
    console.log(JSON.stringify(items));
    res.json(items);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
})

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})
