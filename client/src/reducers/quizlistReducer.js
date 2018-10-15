import { GET_QUIZES_BEGIN, GET_QUIZES_SUCCESS, GET_QUIZES_FAILURE,
         CREATE_QUIZ_BEGIN, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE,
         DELETE_QUIZ_BEGIN, DELETE_QUIZ_SUCCESS, DELETE_QUIZ_FAILURE } from '../actions/types.js';

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
        quizes: [...state.quizes, action.payload.quiz]
      };

    case CREATE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        quizes: []
      };

    case DELETE_QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_QUIZ_SUCCESS:
      const quizID = action.payload.quiz._id
      const index = state.quizes.findIndex((item) => item._id === quizID);
      if (index !== -1) {
        return {
          ...state,
          loading: false,
          quizes: [
            ...state.quizes.slice(0, index),
            ...state.quizes.slice(index + 1)
          ]
        };
      }
      return {
        ...state,
        loading: false,
      };

    case DELETE_QUIZ_FAILURE:
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
