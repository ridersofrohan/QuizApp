import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuizes } from "../actions/quizlist.js";

import Navbar from '../components/Navbar.js';
import QuizList from './QuizList.js';

import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({authenticated: this.props.auth.isAuthenticated});
    }
    if (this.props.quizList.quizes.length === 0) {
      this.props.dispatch(fetchQuizes());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({
        authenticated: nextProps.auth.isAuthenticated
      });
    }
  }

  render() {
    var content = null;
    if (!this.state.authenticated) {
      content =  (
        <div className="content">
          <div className="title">
            Welcome to QUIZAPP!
          </div>
        </div>
      );
    } else {
      content = (
        <QuizList
          history={this.props.history}
          quizes={this.props.quizList.quizes} />
      );
    }

    return (
      <div className="container">
        <Navbar />
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  quizList: state.quizList
})

export default connect(mapStateToProps)(Home);
