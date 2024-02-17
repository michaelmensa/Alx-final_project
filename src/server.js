const express = require('express');
const routes = require('../routes/index')
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

// middleware to parse req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true} ));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Running express app on ${PORT}`)
});