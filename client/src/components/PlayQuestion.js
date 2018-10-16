import React, { Component } from 'react';

import '../styles/PlayQuestion.css';

class PlayQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.choiceClicked = this.choiceClicked.bind(this);
  }

  choiceClicked(index) {
    if (!this.props.isCorrect) {
      this.props.choiceSelected(this.props.index, index)
    }
  }

  render() {
    const choices = this.props.choices.map((value, index) => {
      var className = "";
      if (this.props.graded) {
        if (this.props.correctChoice === index) {
          className = "correct";
        }
        else if (this.props.correctChoice !== index && index === this.props.selected) {
          className = "wrong";
        }
      }
      else if (index === this.props.selected) {
        className = "selected";
      }

      return (
        <div className={"choice " + className}
          key={index} onClick={() => this.choiceClicked(index)}>
          <div className="choiceText">
            {value.text}
          </div>
        </div>
      );
    });

    var correctText = "";
    if (this.props.graded) {
      correctText = this.props.correctChoice === this.props.selected ? " - Correct" : " - Incorrect";
    }

    return (
      <div className="play-question-container">
        <div className="play-question-title">
          <div>
            <label>
              Question {this.props.index+1} {correctText}
            </label>
          </div>
          <div className="choiceText">
            {this.props.title}
          </div>
        </div>

        <div className="play-choices">
          {choices}
        </div>
      </div>
    );
  }
}

export default PlayQuestion;
