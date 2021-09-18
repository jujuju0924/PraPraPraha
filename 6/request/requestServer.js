const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './public_html')));
app.listen(3001, () => console.log('Listeninig on port 3001...'));