import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createQuiz, updateQuiz } from '../actions/quizlist.js';
import { fetchQuestions, createQuestions, updateQuestions, deleteQuestions } from '../actions/questions.js';

import Navbar from '../components/Navbar.js';
import Question from '../components/Question.js';

import '../styles/EditQuiz.css';

class EditQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: undefined,
      name: '',
      updatedQuestions: {},
      addedQuestions: {},
      removedQuestions: [],
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
      if (updated.quiz && updated.quiz._id) {
        const quizID = updated.quiz._id;

        if (this.props.questions.questions[quizID]) {
          updated.quiz.questions = this.props.questions.questions[quizID];
          updated.questions = updated.quiz.questions;
        }
        else {
          this.props.fetchQuestions(quizID);
        }

        if (updated.quiz.title) {
          updated.name = updated.quiz.title
        }
        this.setState(updated);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      var updated = {quiz: nextProps.location.state.quiz};
      if (updated.quiz && updated.quiz._id) {
        const quizID = updated.quiz._id;

        if (nextProps.questions.questions[quizID]) {
          updated.quiz.questions = nextProps.questions.questions[quizID];
          var x = JSON.parse(JSON.stringify(updated.quiz.questions));
          updated.questions = x;
        }

        if (updated.quiz.title) {
          updated.name = updated.quiz.title
        }
        this.setState(updated);
      }
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
    }
    else {
      const oldQuiz = this.state.quiz;

      if (Object.values(this.state.addedQuestions).length > 0) {
        this.props.createQuestions({
          quizID: oldQuiz._id,
          questions: Object.values(this.state.addedQuestions)
        });
      }

      console.log(this.state.updatedQuestions);
      console.log(this.state.addedQuestions);
      console.log(this.state.removedQuestions);

      if (oldQuiz.title !== quiz.name || oldQuiz.questions.length !== quiz.questions.length) {
        this.props.updateQuiz({
          _id: oldQuiz._id,
          name: quiz.name,
          numQuestions: quiz.questions.length
        });
      }
    }
    this.props.history.push("/");
  }

  updateQuestion(index, question) {
    var questions = this.state.questions;
    questions[index] = question;
    this.setState({
      questions: questions
    });
    if (this.state.quiz) {
      if (this.state.addedQuestions[question._id]) {
        var addedQuestions = this.state.addedQuestions;
        addedQuestions[question._id] = question;
        this.setState({
          addedQuestions: addedQuestions
        });
      }
      else {
        for (var i in this.state.quiz.questions) {
          var oldQuestion = this.state.quiz.questions[i];
          if (oldQuestion._id === question._id) {
            var diffChoices = oldQuestion.choices.length !== question.choices.length;
            if (!diffChoices) {
              for (var j in oldQuestion.choices) {
                if (oldQuestion.choices[j] !== question.choices[j]) {
                  diffChoices = true;
                  break;
                }
              }
            }
            if (diffChoices || oldQuestion.title !== question.title ||
                oldQuestion.correctChoice !== question.correctChoice) {
              var updatedQuestions = this.state.updatedQuestions;
              updatedQuestions[question._id] = question;
              this.setState({
                updatedQuestions: updatedQuestions
              });
            }
          }
        }
      }
    }
  }

  removeQuestion(index) {
    var questions = this.state.questions;
    var question = questions.splice(index, 1)[0];
    this.setState({
      questions: questions
    });
    if (this.state.quiz) {
      var removedQuestions = this.state.removedQuestions;
      var addedQuestions = this.state.addedQuestions;
      var updatedQuestions = this.state.updatedQuestions;

      if (this.state.addedQuestions[question._id]) {
        delete addedQuestions[question._id];
      }
      else if (this.state.updatedQuestions[question._id]) {
        delete updatedQuestions[question._id];
      }
      else {
        for (var i in this.state.quiz.questions) {
          if (this.state.quiz.questions[i]._id === question._id) {
            removedQuestions.push(question);
            break;
          }
        }
      }
      this.setState({
        removedQuestions: removedQuestions,
        addedQuestions: addedQuestions,
        updatedQuestions: updatedQuestions
      });
    }
  }

  addQuestion() {
    var questions = this.state.questions;
    var newID = Math.floor(Date.now());
    questions.push({_id: newID, title: "", choices: ["", ""], correctChoice: 0});
    this.setState({
      questions: questions
    });
    if (this.state.quiz) {
      var addedQuestions = this.state.addedQuestions;
      addedQuestions[newID] = questions[questions.length-1];
      this.setState({
        addedQuestions: addedQuestions
      })
    }
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const questions = this.state.questions.map((value, index) => {
      return (
        <Question
          removeQuestion={this.removeQuestion}
          updateQuestion={this.updateQuestion}
          _id={value._id}
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
            {this.state.quiz ? "Update" : "Save"}
          </button>
        </div>
      </div>
    );
  }
}

EditQuiz.propTypes = {
  createQuiz: PropTypes.func.isRequired,
  updateQuiz: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  createQuestions: PropTypes.func.isRequired,
  updateQuestions: PropTypes.func.isRequired,
  deleteQuestions: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  quizList: state.quizList,
  questions: state.questions
})

export default connect(mapStateToProps, {
  createQuiz, updateQuiz, fetchQuestions, createQuestions, updateQuestions, deleteQuestions
})(EditQuiz);
