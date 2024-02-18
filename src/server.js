const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const routes = require('../routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware to parse req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up express-session middleware
app.use(session({
  secret: 'clinicbasesecretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/clinic_base' }),
}));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Running express app on ${PORT}`);
});
