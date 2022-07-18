const ReactDOMServer = require('react-dom/server');
const React = require('react');
const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const Home = require('../views/Home');
const { Post, User } = require('../db/models')

router.get('/', async (req, res) => {

  try {
    const allPosts = await Post.findAll({
      raw: true,
      include:
      {
        model: User,
        attributes: ['name'],
      },
    });
    renderTemplate(Home, { username: req?.session?.user?.name, allPosts }, res);
  } catch (error) {
    console.log(error.message)
  }
});

module.exports = router;
