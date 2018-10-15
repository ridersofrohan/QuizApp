import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types.js';
import setAuthToken from './setAuthToken.js';

export const registerUser = (user, history) => dispatch => {
  axios.post("http://0.0.0.0:5000/register", user)
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      // history.push('/login');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const loginUser = (user) => dispatch => {
  axios.post("http://0.0.0.0:5000/login", user)
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(token));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser(undefined));
  history.push('/login');
}

export const setCurrentUser = (token) => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  }
}
