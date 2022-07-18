const ReactDOMServer = require('react-dom/server');
const React = require('react');
const router = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const Profile = require('../views/user/Profile');
const fileMiddleware = require('../middleware/file');
const { Post, User } = require('../db/models');
const Edit = require('../views/user/Edit');
const isNotAuth = require('../lib/isNotAuth');
const isAuth = require('../lib/isAuth');

router.get('/profile', isAuth, async (req, res) => {
  try {
    const post = await Post.findAll({
      where: { user_id: req?.session?.user?.id },
      raw: true,
      include:
      {
        model: User,
        attributes: ['name'],
      },
    });
    renderTemplate(Profile, { username: req?.session?.user?.name, post }, res);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/upload', isAuth, fileMiddleware.single('avatar'), async (req, res) => {
  if (req.file) {
    req.file.path = req.file.path.slice(6, req.file.path.length);
    const response = await Post.create({
      user_id: req?.session.user?.id,
      body: req.body.body,
      like: 0,
      photo: req.file?.path,
    });
    res.sendStatus(200);
  }
});

router.delete('/delete', isAuth, async (req, res) => {
  const { post_id } = req.body;

  try {
    const checkUser = await Post.findOne({
      where: { id: post_id },
      raw: true,
    });

    if (checkUser.user_id === req?.session?.user?.id) {
      await Post.destroy({
        where: { id: post_id },
      });
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/update/:id', isAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id },
      raw: true,
    });

    renderTemplate(Edit, { username: req?.session?.user?.name, post }, res);
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/update', isAuth, fileMiddleware.single('avatar'), async (req, res) => {
  const { postId, body } = req.body;
  if (req.file) {
    req.file.path = req.file.path.slice(6, req.file.path.length);
    const response = await Post.update({
      body,
      photo: req.file?.path,
    }, {
      where: { id: postId },
    });
    res.sendStatus(200);
  }
});

router.post('/like', isAuth, async (req, res) => {
  const { post_id } = req.body;

  try {
    const post = await Post.findOne({
      where: { id: post_id },
      raw: true,
    });

    const likeUpdate = await Post.update({
      like: post.like + 1,
    }, {
      where: { id: post_id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
