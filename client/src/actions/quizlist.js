import axios from 'axios';
import { GET_QUIZES_BEGIN, GET_QUIZES_SUCCESS, GET_QUIZES_FAILURE,
         CREATE_QUIZ_BEGIN, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE,
         DELETE_QUIZ_BEGIN, DELETE_QUIZ_SUCCESS, DELETE_QUIZ_FAILURE,
         GET_QUESTIONS_BEGIN, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE  } from './types.js';

export const fetchQuestions = (quizID) => dispatch => {
  dispatch({type: GET_QUESTIONS_BEGIN});
  axios.get("http://0.0.0.0:5000/questions", { params: { quiz: quizID } })
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: {quizID: quizID, questions: json.questions }
      });
      return {quizID: quizID, questions: json.questions };
    })
    .catch((err) => {
      dispatch({
        type: GET_QUESTIONS_FAILURE,
        payload: { err }
      })
    });
};

export const fetchQuizes = () => dispatch => {
  dispatch({type: GET_QUIZES_BEGIN});
  axios.get("http://0.0.0.0:5000/quizes")
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: GET_QUIZES_SUCCESS,
        payload: {quizes: json.quizes }
      });
      return json.quizes;
    })
    .catch((err) => {
      dispatch({
        type: GET_QUIZES_FAILURE,
        payload: { err }
      })
    });
};

export const createQuiz = (quiz) => dispatch => {
  dispatch({type: CREATE_QUIZ_BEGIN});
  axios.post("http://0.0.0.0:5000/create-quiz", quiz)
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: CREATE_QUIZ_SUCCESS,
        payload: {quiz: json }
      });
      return json;
    })
    .catch((err) => dispatch({
      type: CREATE_QUIZ_FAILURE,
      payload: { err }
    }));
};

export const deleteQuiz = (quiz) => dispatch => {
  dispatch({type: DELETE_QUIZ_BEGIN});
  axios.post("http://0.0.0.0:5000/delete-quiz", quiz)
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: DELETE_QUIZ_SUCCESS,
        payload: {quiz: json }
      });
      return json;
    })
    .catch((err) => dispatch({
      type: DELETE_QUIZ_FAILURE,
      payload: { err }
    }));
};
