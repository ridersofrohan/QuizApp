import { GET_QUIZES_BEGIN, GET_QUIZES_SUCCESS, GET_QUIZES_FAILURE,
         CREATE_QUIZ_BEGIN, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE,
         DELETE_QUIZ_BEGIN, DELETE_QUIZ_SUCCESS, DELETE_QUIZ_FAILURE,
         UPDATE_QUIZ_BEGIN, UPDATE_QUIZ_SUCCESS, UPDATE_QUIZ_FAILURE } from '../actions/types.js';

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
        quizes: state.quizes
      };

    case UPDATE_QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_QUIZ_SUCCESS:
      const quizid = action.payload.quiz._id;
      const i = state.quizes.findIndex((item) => item._id === quizid);
      if (i !== -1) {
        return {
          ...state,
          loading: false,
          quizes: [
            ...state.quizes.slice(0, i),
            action.payload.quiz,
            ...state.quizes.slice(i + 1)
          ]
        };
      }
      return {
        ...state,
        loading: false,
      };

    case UPDATE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        quizes: state.quizes
      };


    case DELETE_QUIZ_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_QUIZ_SUCCESS:
      const quizID = action.payload.quiz._id;
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
        quizes: state.quizes
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
        quizes: state.quizes
      };

    default:
      return state;
  }
}
