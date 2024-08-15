const sequelize = require('../config/connection');
const { User, Question } = require('../models');

const userData = require('./userData.json');
const questionData = require('./questionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Question.bulkCreate(questionData);

  process.exit(0);
};

seedDatabase();
