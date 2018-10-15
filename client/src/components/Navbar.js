import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication.js';
import { withRouter } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/Navbar.css';

class Navbar extends Component {

  constructor() {
    super();

    this.state = {
      authenticated: false
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({authenticated: this.props.auth.isAuthenticated});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({authenticated: nextProps.auth.isAuthenticated});
    }
  }

  render() {
    var rightLinks = null;
    if (this.state.authenticated) {
      rightLinks = (
        <span className="right" >
          <Link to="/create-quiz" className="link"> New Quiz </Link>
          <span className="link" onClick={this.onLogout}> Logout </span>
        </span>
      );
    } else {
      rightLinks = (
        <span className="right" >
          <Link to="/login" className="link"> Log In </Link>
          <Link to="/signup" className="link"> Sign up </Link>
        </span>
      );
    }


    return(
      <div className="header">
        <Link to="/" className="left">
          <img src={logo} className="logo" alt="logo" />
          <span> Quizapp </span>
        </Link>
        {rightLinks}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
