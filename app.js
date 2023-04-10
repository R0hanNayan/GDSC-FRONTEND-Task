const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser);
app.use(express.static("public"));



