const router = require("express").Router();
const { Question } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const questionData = await Question.findAll({
      attributes: { exclude: ["choices", "answer"] },
    });

    res.status(200).json(questionData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id);

    if (!questionData) {
      res.status(404).json({ message: "No questions found!" });
      return;
    }
    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/genre/:genre", async (req, res) => {
  try {
    const questionData = await Question.findOne(
      { where: { genre: req.params.genre } },
      { limit: 1 }
    );

    const question = questionData.get({ plain: true });


  console.log(question.answer);

    question.choices = question.choices.map(
      (choice, index) => ({ correct: index == question.answer, text: choice })
    );

    const layout = false;

    return res.render('question', { question, layout });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
