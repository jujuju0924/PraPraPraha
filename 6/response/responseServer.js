const ngrok = require("ngrok"),
express = require("express");
const multipart = require('connect-multiparty');
const port = 8080;
const app = express();

app.use(multipart());

app.post('/test1', (req, res) => {
  console.log('/test1');
  console.log(req.body);
  
  res.set('Access-Control-Allow-Origin', ' http://localhost:3001');

  const obj = {
      message: 'Hello from server!'
  };
  res.status(200).json(obj);
});

ngrok.connect(port).then((url) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Example app listening at ${url}`);
  });
});