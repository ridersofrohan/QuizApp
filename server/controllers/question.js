const Question = require('../models/question.js');

exports.getQuestions = function(req, res, next) {
  const quizID = req.query.quiz;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  Question.find({quiz: quizID}).then((questions) => {
    return res.status(200).json({
      questions: questions
    });
  })
}

exports.updateQuestions = function(req, res, next) {
  const quizID = req.body.quizID;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  var questions = req.body.questions;
  if (!questions || questions.length === 0) {
    return res.status(422).send({ success: false, error: 'You must pass questions.'});
  }

  questions.forEach((question) => {
    Question.findOne({_id: question._id}).then((q) => {
      q.title = question.title;
      q.choices = question.choices;
      q.correctChoice = question.correctChoice;
      q.save().then((updatedQ) => {
        console.log(updatedQ);
      });
    })
  });

  return res.status(200).json({
    quizID: quizID,
    questions: questions
  });
}

exports.createQuestions = function(req, res, next) {
  const quizID = req.body.quizID;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  var questions = req.body.questions;
  if (!questions || questions.length === 0) {
    return res.status(422).send({ success: false, error: 'You must pass questions.'});
  }

  const updatedQuestions = req.body.questions.map((question, i) => {
    return {
      title: question.title,
      quiz: quizID,
      choices: question.choices,
      correctChoice: question.correctChoice
    };
  });

  Question.insertMany(updatedQuestions, function(error, docs) {
    return res.status(200).json({
      quizID: quizID,
      questions: docs
    });
  });
}

exports.deleteQuestions = function(req, res, next) {
  const quizID = req.body.quizID;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  var questions = req.body.questions;
  if (!questions || questions.length === 0) {
    return res.status(422).send({ success: false, error: 'You must pass questions.'});
  }

  questions.forEach((question) => {
    Question.findOne({_id: question._id}).then((q) => {
      q.remove();
    })
  });

  return res.status(200).json({
    quizID: quizID,
    questions: questions
  });
}
