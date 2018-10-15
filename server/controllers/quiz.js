const Quiz = require('../models/quiz.js');
const Question = require('../models/question.js');

exports.getQuizes = function(req, res, next) {
  Quiz.find({author: req.user._id}).then((quizes) => {
    return res.status(200).json({
      quizes: quizes
    });
  });
}

exports.createQuiz = function(req, res, next) {
  const newQuiz = new Quiz({
    title: req.body.name,
    author: req.user._id,
    numQuestions: req.body.questions.length
  });

  newQuiz.save().then((quiz) => {
    const questions = req.body.questions.map((question, map) => {
      return {
        title: question.title,
        quiz: newQuiz._id,
        choices: question.choices,
        correctChoice: question.correctChoice
      };
    });

    Question.insertMany(questions, function(error, docs) {
      return res.status(200).json({
        title: quiz.title,
        _id: quiz._id,
        questions: docs,
        numQuestions: docs.length
      });
    });
  });
}

exports.deleteQuiz = function(req, res, next) {
  const quizID = req.body._id;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  Quiz.findOne({_id: quizID}).then((quiz) => {
    quiz.remove();

    Question.find({quiz: quizID}).then((questions) => {
      if (questions) {
        for (var i in questions) {
          questions[i].remove();
        }
        return res.status(200).json(req.body);
      }
    });
  });
}

exports.updateQuiz = function(req, res, next) {
  const quizID = req.body._id;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  Quiz.findOne({_id: quizID}).then((quiz) => {
    quiz.title = req.body.name;
    quiz.numQuestions = req.body.numQuestions;

    quiz.save().then((quiz) => {
      return res.status(200).json(quiz);
    });
  });
}
