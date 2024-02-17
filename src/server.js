const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes/index')
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

// connect to mongodb
const uri = 'mongodb://localhost:27017/clinic_base';
mongoose.connect(uri)
.then(() => console.log('Connected to DB'))
.catch((err) => console.log(err));

// middleware to parse req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true} ));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Running express app on ${PORT}`)
});