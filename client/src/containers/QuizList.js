import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../styles/QuizList.css';

class QuizList extends Component {
  render() {
    const quizes = this.props.quizes.map((quiz, index) => {
      return (
        <div className="quiz" key={index}>
          <span className="left"> {quiz.title} </span>
          <span className="center"> {quiz.numQuestions} </span>
          <span className="right">
            <button> Edit </button>
            <button> Remove </button>
            <button> Play </button>
          </span>
        </div>
      );
    });

    return (
      <div className="quizzes-container">
        <h1> Your Quizzes </h1>
        <div className="quizes">
          <div className="quiz">
            <span className="left underline"> Name </span>
            <span className="center underline"> Number of Questions </span>
            <span className="right underline"> Actions </span>
          </div>
          {quizes}
        </div>
      </div>
    );
  }
}

export default QuizList;
