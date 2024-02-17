const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware to parse req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Running express app on ${PORT}`);
});
