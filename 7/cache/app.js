const express = require('express')
const cacheControl = require('express-cache-controller');

const app1 = express()
const port1 = 8000
app1.use(cacheControl({ maxAge: 0 }))

app1.get('/public/tono', (req, res) => {
  res.cacheControl = {
    maxAge: 3600
  }
})

app1.use(express.static('public'));

app1.listen(port1, () => {
  console.log(`Example app listening at http://localhost:${port1}`)
})

const app2 = express()
const port2 = 8080

app2.use(function (req,res,next){
  res.header('Cache-Control', 'no-store');
  next();
})

app2.use(express.static('public'));

app2.listen(port2, () => {
  console.log(`Example app listening at http://localhost:${port2}`);
})