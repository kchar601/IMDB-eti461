const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const app = express()
const port = 80
app.use(express.static('public'))

const request = require('request');


app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})
