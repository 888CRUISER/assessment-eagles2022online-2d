const ReactDOMServer = require('react-dom/server');
const React = require('react');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const renderTemplate = require('../lib/renderTemplate');
const AuthReg = require('../views/auth/AuthReg');
const AuthLog = require('../views/auth/AuthLog');
const isNotAuth = require('../lib/isNotAuth');
const isAuth = require('../lib/isAuth');

router.get('/reg', isNotAuth, async (req, res) => {
  renderTemplate(AuthReg, null, res);
});

router.post('/reg', isNotAuth, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userValid = await User.findOne({ where: { email } });
    if (userValid) return res.sendStatus(303);
  } catch (error) {
    console.log(error.message);
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      name,
      email,
      password: hashPass,
    });

    req.session.user = { id: createUser.id, name: createUser.name, email: createUser.email };
    return res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/log', isNotAuth, async (req, res) => {
  renderTemplate(AuthLog, null, res);
});

router.post('/log', isNotAuth, async (req, res) => {
  const { email, password } = req.body;

  try {
    const createUser = await User.findOne({ where: { email } });
    const isValidPassword = await bcrypt.compare(password, createUser.password);

    if (isValidPassword) {
      req.session.user = { id: createUser.id, name: createUser.name, email: createUser.email };
      return res.sendStatus(200);
    }

    return res.sendStatus(403);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/quit', isAuth, (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.redirect('/');
});

module.exports = router;
