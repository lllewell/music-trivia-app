const router = require('express').Router();
const { Question } = require('../../models');

router.get('/:genre', async (req, res) => {
    try {
      const questionData = await Question.findOne( {where: {genre: req.params.genre} }, {limit: 1});
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(questionData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const questionData = await Question.findAll({ 
        attributes: {exclude:["choices", "answer"]}
      });
     
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(questionData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
 
  router.get('/:id', async (req, res) => {

    try {
      const questionData = await Question.findByPk(req.params.id);
      
      if (!questionData) {
        res.status(404).json({ message: 'No questions found!'});
        return;
      }
      res.status(200).json(questionData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // const getRandomEmployee = function(employeesArray) {
  //   // TODO: Select and display a random employee
  //   if (employeesArray.length === 0) {
  //     console.log("No employees found");
  //     return;
  //   }
  //   const randomIndex = Math.floor(Math.random() * employeesArray.length);
  //   const randomEmployee = employeesArray[randomIndex];
  //   console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName} ${randomEmployee.salary.toFixed(2)}`);
  // }
  module.exports = router;