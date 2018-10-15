import { GET_QUIZES_BEGIN, GET_QUIZES_SUCCESS, GET_QUIZES_FAILURE,
         CREATE_QUIZ_BEGIN, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE } from '../actions/types.js';

const initialState = {
  quizes: [],
  loading: false,
  error: null
};

export default function quizlistReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: state.quizes.concat([action.payload.quiz])
      };

    case CREATE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        quizes: []
      };

    case GET_QUIZES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload.quizes
      };

    case GET_QUIZES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        quizes: []
      };

    default:
      return state;
  }
}
