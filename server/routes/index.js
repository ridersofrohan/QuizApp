const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportService = require('../controllers/passport.js');

const User = require('../models/user.js');
const Quiz = require('../models/quiz.js');
const Question = require('../models/question.js');

const AuthenticationController = require('../controllers/authentication');

router.post('/register', AuthenticationController.register);
router.post('/login', AuthenticationController.login);

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    email: req.user.email
  });
});

router.get('/quizes', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user._id);
  Quiz.find({author: req.user._id}).then((quizes) => {
    return res.status(200).json({
      quizes: quizes
    });
  });
});

router.post('/create-quiz', passport.authenticate('jwt', {session: false}), (req, res) => {
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
});

router.post('/delete-quiz', passport.authenticate('jwt', {session: false}), (req, res) => {
  const quizID = req.body._id;
  if (!quizID) {
    return res.status(422).send({ success: false, error: 'You must pass a quiz id.'});
  }

  Quiz.findOne({_id: quizID}).then((quiz) => {
    quiz.remove();

    Question.find({quiz: quizID}).then((quizes) => {
      if (quizes) {
        for (var i in quizes) {
          quizes[i].remove();
        }
        return res.status(200).json(req.body);
      }
    });
  });
});


router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is Live :)"
  });
});

module.exports = router;
