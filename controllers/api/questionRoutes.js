const router = require('express').Router();
const { Question } = require('../../models');

router.get('/:genre', async (req, res) => {
    try {
      const questionData = await Question.findAll( {where: {genre: req.params.genre} }, {limit: 1});
  
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