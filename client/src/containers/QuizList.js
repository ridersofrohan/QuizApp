import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteQuiz } from '../actions/quizlist.js';

import '../styles/QuizList.css';

class QuizList extends Component {
  constructor(props) {
    super(props);

    this.onPlayClicked = this.onPlayClicked.bind(this);
    this.onRemoveClicked = this.onRemoveClicked.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
  }

  onPlayClicked(index) {
    this.props.history.push({
      pathname: '/play-quiz',
      state: {
        quiz: this.props.quizes[index]
      }
    });
  }

  onRemoveClicked(index) {
    this.props.deleteQuiz(this.props.quizes[index]);
  }

  onEditClicked(index) {
    this.props.history.push({
      pathname: '/edit-quiz',
      state: {
        quiz: this.props.quizes[index]
      }
    });
  }

  render() {
    const quizes = this.props.quizes.map((quiz, index) => {
      return (
        <div className="quiz" key={index}>
          <span className="left"> {quiz.title} </span>
          <span className="center"> {quiz.numQuestions} </span>
          <span className="right">
            <button onClick={() => this.onEditClicked(index)}> Edit </button>
            <button onClick={() => this.onRemoveClicked(index)}> Remove </button>
            <button onClick={() => this.onPlayClicked(index)}> Play </button>
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

QuizList.propTypes = {
  deleteQuiz: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { deleteQuiz })(QuizList);
