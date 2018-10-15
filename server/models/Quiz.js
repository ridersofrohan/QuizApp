const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;
