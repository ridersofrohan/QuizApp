import React, { Component } from 'react';

import '../styles/Question.css';

class Question extends Component {
  constructor(props) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.markAsCorrectChoice = this.markAsCorrectChoice.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
  }

  removeQuestion() {
    this.props.removeQuestion(this.props.index);
  }

  markAsCorrectChoice(index) {
    var question = {
      title: this.props.title,
      choices: this.props.choices,
      correctChoice: index
    };
    this.props.updateQuestion(this.props.index, question);
  }

  removeChoice(index) {
    const correct = index < this.props.correctChoice ? this.props.correctChoice-1 : this.props.correctChoice;
    var choices = this.props.choices;
    choices.splice(index, 1);
    var question = {
      title: this.props.title,
      choices: choices,
      correctChoice: correct
    }
    this.props.updateQuestion(this.props.index, question);
  }

  addChoice() {
    var choices = this.props.choices;
    choices.push("");
    var question = {
      title: this.props.title,
      choices: choices,
      correctChoice: this.props.correctChoice
    }
    this.props.updateQuestion(this.props.index, question);
  }

  onNameChange(e) {
    var question = {
      title: e.target.value,
      choices: this.props.choices,
      correctChoice: this.props.correctChoice
    }
    this.props.updateQuestion(this.props.index, question);
  }

  onChoiceTextChange(e, index) {
    var choices = this.props.choices;
    choices[index] = e.target.value;
    var question = {
      title: this.props.title,
      choices: choices,
      correctChoice: this.props.correctChoice
    }
    this.props.updateQuestion(this.props.index, question);
  }

  render() {
    const choices = this.props.choices.map((value, index) => {
      var buttons = [];

      if (index !== this.props.correctChoice) {
        buttons.push(
          <button key={1} onClick={() => this.markAsCorrectChoice(index)}>
            Mark as correct
          </button>
        );
        if (this.props.choices.length > 2) {
          buttons.push(
            <button key={2} onClick={() => this.removeChoice(index)}>
              Remove
            </button>
          );
        }
      }
      return (
        <div className="choice" key={index}>
          <input
            placeholder="Choice text"
            className="form-control"
            name="title"
            onChange={(e) => this.onChoiceTextChange(e, index)}
            value={value} />
          {buttons}
          { buttons.length === 0 ? <span className="correct"> Correct Answer </span> : null }
        </div>
      );
    });

    return (
      <div className="question-container">
        <div className="question-title">
          <div>
            <label>
              Question {this.props.index+1}
            </label>
            <button className="right" onClick={this.removeQuestion}>
              Remove
            </button>
          </div>
          <input
            placeholder="Question title"
            className="form-control"
            name="title"
            onChange={ this.onNameChange }
            value={ this.props.title } />
        </div>

        <div className="choices">
          {choices}
        </div>

        {this.props.choices.length < 10 ? (
          <button className="addChoice" onClick={this.addChoice}>
            Add Choice
          </button> ) : null
        }
      </div>
    );
  }
}

export default Question;
