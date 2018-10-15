import { combineReducers } from 'redux';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import quizlistReducer from './quizlistReducer.js';
import questionsReducer from './questionsReducer.js';

const appReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  quizList: quizlistReducer,
  questions: questionsReducer
});

const rootReducer = ( state, action ) => {
  if ( action.type === "LOG_OUT" ) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
