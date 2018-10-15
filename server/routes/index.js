const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportService = require('../controllers/passport.js');

const AuthenticationController = require('../controllers/authentication');
const QuestionController = require('../controllers/question');
const QuizController = require('../controllers/quiz');


router.post('/register', AuthenticationController.register);
router.post('/login', AuthenticationController.login);


router.get('/questions', passport.authenticate('jwt', {session: false}), QuestionController.getQuestions);
router.post('/create-questions', passport.authenticate('jwt', {session: false}), QuestionController.createQuestions);
router.post('/delete-questions', passport.authenticate('jwt', {session: false}), QuestionController.deleteQuestions);
router.post('/update-questions', passport.authenticate('jwt', {session: false}), QuestionController.updateQuestions);


router.get('/quizes', passport.authenticate('jwt', {session: false}), QuizController.getQuizes);
router.post('/create-quiz', passport.authenticate('jwt', {session: false}), QuizController.createQuiz);
router.post('/delete-quiz', passport.authenticate('jwt', {session: false}), QuizController.deleteQuiz);
router.post('/update-quiz', passport.authenticate('jwt', {session: false}), QuizController.updateQuiz);


router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is Live :)"
  });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    email: req.user.email
  });
});

module.exports = router;
