import { GET_QUESTIONS_BEGIN, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE,
         CREATE_QUESTIONS_BEGIN, CREATE_QUESTIONS_SUCCESS, CREATE_QUESTIONS_FAILURE,
         DELETE_QUESTIONS_BEGIN, DELETE_QUESTIONS_SUCCESS, DELETE_QUESTIONS_FAILURE,
         UPDATE_QUESTIONS_BEGIN, UPDATE_QUESTIONS_SUCCESS, UPDATE_QUESTIONS_FAILURE } from '../actions/types.js';

const initialState = {
  questions: {},
  loading: false,
  error: null
};

export default function questionsReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_QUESTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CREATE_QUESTIONS_SUCCESS:
      var quizid = action.payload.quizID;
      console.log(
        {
          ...state.questions,
          [quizid]: state.questions[quizid].concat(action.payload.questions)
        }
      );
      return {
        ...state,
        loading: false,
        questions: {
          ...state.questions,
          [quizid]: state.questions[quizid].concat(action.payload.questions)
        }
      };

    case CREATE_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        questions: state.questions
      };

    case UPDATE_QUESTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_QUESTIONS_SUCCESS:
      quizid = action.payload.quizID;
      const oldQuestions = state.questions[quizid].filter((q) => {
        return !action.payload.questions.some(newQ => newQ._id === q._id);
      });
      return {
        ...state,
        loading: false,
        questions: {
          ...state.questions,
          [quizid]: oldQuestions.concat(action.payload.questions)
        }
      };

    case UPDATE_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        questions: state.questions
      };


    case DELETE_QUESTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_QUESTIONS_SUCCESS:
      quizid = action.payload.quizID;
      const newQuestions = state.questions[quizid].filter((q) => {
        return !action.payload.questions.some(newQ => newQ._id === q._id);
      });
      return {
        ...state,
        loading: false,
        questions: {
          ...state.questions,
          [quizid]: newQuestions
        }
      };

    case DELETE_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        questions: state.questions
      };

    case GET_QUESTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_QUESTIONS_SUCCESS:
      quizid = action.payload.quizID;
      return {
        ...state,
        loading: false,
        questions: {
          ...state.questions,
          [quizid]: action.payload.questions
        }
      };

    case GET_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
