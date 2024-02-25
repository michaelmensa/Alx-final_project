const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

// Set the 'views' directory to hold your HTML files
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to 'html' (optional, but recommended)
app.set('view engine', 'ejs');

// middleware to parse req.body in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

connectDB();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Running express app on ${PORT}`);
});
