import axios from 'axios';
import { GET_QUIZES_BEGIN, GET_QUIZES_SUCCESS, GET_QUIZES_FAILURE,
         CREATE_QUIZ_BEGIN, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE } from './types.js';

export const fetchQuizes = () => dispatch => {
  dispatch(fetchQuizesBegin());
  axios.get("http://0.0.0.0:5000/quizes")
    .then((res) => {
      return res.data;
    })
    .then((json) => {
      dispatch(fetchQuizesSuccess(json.quizes));
      return json.quizes;
    })
    .catch((err) => {
      dispatch(fetchQuizesFailure(err))
    });
}

export const createQuiz = (quiz) => dispatch => {
  dispatch(createQuizBegin());
  axios.post("http://0.0.0.0:5000/create-quiz", quiz)
    .then((res) => { res.json() })
    .then((json) => {
      dispatch(createQuizSuccess(json.quiz));
      return json.quiz;
    })
    .catch((err) => dispatch(createQuizFailure(err)));
}

export const createQuizBegin = () => ({
  type: CREATE_QUIZ_BEGIN
});

export const createQuizSuccess = quizes => ({
  type: CREATE_QUIZ_SUCCESS,
  payload: { quizes }
});

export const createQuizFailure = error => ({
  type: CREATE_QUIZ_FAILURE,
  payload: { error }
});

export const fetchQuizesBegin = () => ({
  type: GET_QUIZES_BEGIN
});

export const fetchQuizesSuccess = quizes => ({
  type: GET_QUIZES_SUCCESS,
  payload: { quizes }
});

export const fetchQuizesFailure = error => ({
  type: GET_QUIZES_FAILURE,
  payload: { error }
});
