import { combineReducers } from 'redux';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import quizListReducer from './quizlistReducer.js'

const appReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  quizList: quizListReducer
});

const rootReducer = ( state, action ) => {
  if ( action.type === "LOG_OUT" ) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
