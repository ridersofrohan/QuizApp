import { combineReducers } from 'redux';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import quizListReducer from './quizlistReducer.js'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  quizList: quizListReducer
});
