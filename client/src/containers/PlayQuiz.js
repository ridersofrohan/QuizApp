import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../styles/QuizList.css';

class PlayQuiz extends Component {
  render() {
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

export default PlayQuiz;
