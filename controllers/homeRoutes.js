const router = require('express').Router();
const { User, Question } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const questionData = await Question.findAll({
      attributes: { exclude: ['answer', 'genre'] },
    });

    const questions = questionData.map((question) => question.get({ plain: true }));

    res.render('homepage', {
      questions,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
