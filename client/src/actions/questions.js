import axios from 'axios';
import { GET_QUESTIONS_BEGIN, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE,
         CREATE_QUESTIONS_BEGIN, CREATE_QUESTIONS_SUCCESS, CREATE_QUESTIONS_FAILURE,
         DELETE_QUESTIONS_BEGIN, DELETE_QUESTIONS_SUCCESS, DELETE_QUESTIONS_FAILURE,
         UPDATE_QUESTIONS_BEGIN, UPDATE_QUESTIONS_SUCCESS, UPDATE_QUESTIONS_FAILURE } from './types.js';

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

export const createQuestions = (questions) => dispatch => {
  dispatch({type: CREATE_QUESTIONS_BEGIN});
  axios.post("http://0.0.0.0:5000/create-questions", questions)
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      console.log(json);
      dispatch({
        type: CREATE_QUESTIONS_SUCCESS,
        payload: {questions: json.questions, quizID: json.quizID }
      });
      return json;
    })
    .catch((err) => dispatch({
      type: CREATE_QUESTIONS_FAILURE,
      payload: { err }
    }));
};

export const deleteQuestions = (questions) => dispatch => {
  dispatch({type: DELETE_QUESTIONS_BEGIN});
  axios.post("http://0.0.0.0:5000/delete-questions", questions)
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: DELETE_QUESTIONS_SUCCESS,
        payload: {questions: json.questions, quizID: json.quizID }
      });
      return json;
    })
    .catch((err) => dispatch({
      type: DELETE_QUESTIONS_FAILURE,
      payload: { err }
    }));
};

export const updateQuestions = (questions) => dispatch => {
  dispatch({type: UPDATE_QUESTIONS_BEGIN});
  axios.post("http://0.0.0.0:5000/update-questions", questions)
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch({
        type: UPDATE_QUESTIONS_SUCCESS,
        payload: {questions: json.questions, quizID: json.quizID }
      });
      return json;
    })
    .catch((err) => dispatch({
      type: UPDATE_QUESTIONS_FAILURE,
      payload: { err }
    }));
}
