require('dotenv').config();
const React = require('react');

const express = require('express');
const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);
const logger = require('morgan');
const path = require('path');

const indexRoute = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(sessions({
  store: new FileStore(),
  name: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use('/home', indexRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(PORT, (req, res) => {
  console.log('listening listening', PORT);
});
