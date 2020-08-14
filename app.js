const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(options,{path : '../config/env'});

const fs = require('fs'); 

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGO_DB_LOCAL;
//require('./config/database').mongoURI;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser middleware
// 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/profile', require('./routes/profile.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
