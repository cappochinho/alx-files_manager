const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port);
