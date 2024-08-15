const router = require('express').Router();
const { Question } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const questionData = await Question.findOne( {where: {genre: req.body.genre} }, {limit: 1});
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(questionData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;