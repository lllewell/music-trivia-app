const router = require('express').Router();
const { Game, Question } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const questionData = await Question.findAll({
      attributes: { exclude: ['genre'] },
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

router.get('/scores', async (req, res) => {
  try {
    const gameData = await Game.findAll({
      order: [
        ['score', 'DESC']
      ]
    });
    
    const games = gameData.map((game) => game.get({ plain: true }));

    res.render('scores', {
      games,
      loggedIn: req.session.loggedIn,
    })
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;
