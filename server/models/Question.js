const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz',
    required: true
  },
  choices: {
    type: [String],
    required: true
  },
  correctChoice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
