import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createQuiz, fetchQuestions } from '../actions/quizlist.js';

import Navbar from '../components/Navbar.js';
import Question from '../components/Question.js';

import '../styles/EditQuiz.css';

class EditQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: undefined,
      name: '',
      questions: [],
      errors: {}
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.canSave = this.canSave.bind(this);
    this.saveQuiz = this.saveQuiz.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      var updated = {quiz: this.props.location.state.quiz};

      if (updated.quiz.questions) {
        updated.questions = updated.quiz.questions;
      }
      else {
        this.props.fetchQuestions(updated.quiz._id);
      }

      if (updated.quiz.title) {
        updated.name = updated.quiz.title
      }
      this.setState(updated);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.state) {
      var updated = {quiz: this.props.location.state.quiz};

      if (updated.quiz.questions) {
        updated.questions = updated.quiz.questions;
      }

      if (updated.quiz.title) {
        updated.name = updated.quiz.title
      }
      this.setState(updated);
    }
  }

  canSave() {
    if (this.state.name === "") {
      return false;
    }
    if (this.state.questions.length === 0) {
      return false;
    }

    for (var i in this.state.questions) {
      const question = this.state.questions[i];
      if (question.title === "") {
        return false;
      }
      if (question.choices < 2) {
        return false;
      }
      for (var j in question.choices) {
        if (question.choices[j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  saveQuiz() {
    const quiz = {
      name: this.state.name,
      questions: this.state.questions
    };
    if (!this.state.quiz) {
      this.props.createQuiz(quiz);
      this.props.history.push("/");
    }
  }

  updateQuestion(index, question) {
    var questions = this.state.questions;
    questions[index] = question;
    this.setState({
      questions: questions
    });
  }

  removeQuestion(index) {
    var questions = this.state.questions;
    questions.splice(index, 1);
    this.setState({
      questions: questions
    });
  }

  addQuestion() {
    var questions = this.state.questions;
    questions.push({title: "", choices: ["", ""], correctChoice: 0});
    this.setState({
      questions: questions
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const questions = this.state.questions.map((value, index) => {
      return (
        <Question
          removeQuestion={this.removeQuestion}
          updateQuestion={this.updateQuestion}
          key={index}
          index={index}
          correctChoice={value.correctChoice}
          title={value.title}
          choices={value.choices} />
      );
    });

    return (
      <div className="container">
        <Navbar />

        <div className="content">
          <div className="title">
            <input
              placeholder="Quiz Name"
              className="form-control"
              name="name"
              onChange={ this.onInputChange }
              value={ this.state.name } />
          </div>

          <div className="questions-container">
            {questions}
          </div>

          <button className="addQuestion" onClick={this.addQuestion}>
            Add Question
          </button>
          <button disabled={!this.canSave()} onClick={this.saveQuiz}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

EditQuiz.propTypes = {
  createQuiz: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  quizList: state.quizList
})

export default connect(mapStateToProps, { createQuiz, fetchQuestions })(EditQuiz);
