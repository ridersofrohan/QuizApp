import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/questions.js';

import Navbar from '../components/Navbar.js';
import PlayQuestion from '../components/PlayQuestion.js';

import '../styles/PlayQuiz.css';

class PlayQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {},
      name: '',
      questions: [],
      errors: {}
    };

    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.choiceSelected = this.choiceSelected.bind(this);
    this.gradeQuiz = this.gradeQuiz.bind(this);
  }

  shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    for (var k in questions) {
      const correct = questions[k].correctChoice;
      questions[k].choices = questions[k].choices.map((option, index) => {
        return {
          text: option,
          correct: index === correct
        };
      });
      var choices = questions[k].choices;
      for (let l = choices.length - 1; l > 0; l--) {
        const m = Math.floor(Math.random() * (l + 1));
        if (l === questions[k].correctChoice) {
          questions[k].correctChoice = m;
        }
        if (m === questions[k].correctChoice) {
          questions[k].correctChoice = l;
        }
        [choices[l], choices[m]] = [choices[m], choices[l]];
      }
      questions[k].choices = choices;
    }
    return questions;
  }

  choiceSelected(qIndex, choiceIndex) {
    var question = this.state.questions[qIndex];
    question.selected = choiceIndex;
    var questions = this.state.questions;
    questions[qIndex] = question;
    this.setState({
      questions: questions
    });
  }

  gradeQuiz() {
    if (this.state.numCorrect) {
      this.props.history.push("/");
      return;
    }

    var questions = this.state.questions;
    var correct = 0;
    for (var i in questions) {
      const correctChoice = questions[i].choices.findIndex((item) => item.correct === true);
      questions[i].correctChoice = correctChoice;
      correct += correctChoice === questions[i].selected ? 1 : 0;
    }
    this.setState({
      questions: questions,
      numCorrect: correct
    });
  }

  componentDidMount() {
    if (this.props.location.state) {
      var updated = {quiz: this.props.location.state.quiz};
      if (updated.quiz && updated.quiz._id) {
        const quizID = updated.quiz._id;

        if (this.props.questions.questions[quizID]) {
          updated.quiz.questions = this.props.questions.questions[quizID];
          var questions = JSON.parse(JSON.stringify(updated.quiz.questions));
          updated.questions = this.shuffleQuestions(questions);
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
          var questions = JSON.parse(JSON.stringify(updated.quiz.questions));
          updated.questions = this.shuffleQuestions(questions);
        }

        if (updated.quiz.title) {
          updated.name = updated.quiz.title
        }
        this.setState(updated);
      }
    }
  }

  render() {
    const questions = this.state.questions.map((value, index) => {
      return (
        <PlayQuestion
          key={index}
          index={index}
          graded={this.state.numCorrect}
          correctChoice={value.correctChoice}
          choiceSelected={this.choiceSelected}
          selected={value.selected}
          title={value.title}
          choices={value.choices} />
      );
    });

    return (
      <div className="container">
        <Navbar />
        <h1> {this.state.name} </h1>
        <h3>
          {this.state.numCorrect ? this.state.numCorrect + " / " : ""} {this.state.quiz.numQuestions} Questions {this.state.numCorrect ? "Correct" : ""}
        </h3>
        <div className="questions-container">
          {questions}
        </div>
        <button className="btn btn-primary" onClick={this.gradeQuiz}>
          { this.state.numCorrect ? "Back" : "Submit" }
        </button>
      </div>
    );
  }
}

PlayQuiz.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  questions: state.questions
})

export default connect(mapStateToProps, { fetchQuestions})(PlayQuiz);
