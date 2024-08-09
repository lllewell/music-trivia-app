const User = require('./User');
const Game = require('./Game');
const Question = require('./Question');
const Score = require('./Score');

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Game.belongsTo(User, {
  foreignKey: 'user_id',
});

Game.belongsTo(Question, {
  foreignKey: 'question_id',
});

Question.hasMany(Game, {
  foreignKey: 'question_id',
});

User.hasMany(Score, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Score.belongsTo(User, {
  foreignKey: 'user_id',
});

Game.hasMany(Score, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

Score.belongsTo(Game, {
  foreignKey: 'game_id',
});

module.exports = { User, Game, Question, Score };