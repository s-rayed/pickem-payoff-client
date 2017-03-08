import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_DATA, GET_DATA_ERROR, UPDATE_CHOICE, UPDATE_CHOICE_ERROR } from './types';

const API_URL = 'http://localhost:3090';

export function getGameData() {
  return function(dispatch) {
    axios.get(`${API_URL}/getgamedata`)
      .then(response => {

        dispatch({ type: GET_DATA, payload: response.data.data })
      })
      .catch((err) => {
        console.log(err);
        dispatch(getDataError('Problem with getting data'));
      })
  }
}

export function updateUserDailyChoice({ email, chosenTeam}) {
  return function(dispatch) {
    axios.put(`${API_URL}/updatedailychoice`, { email, chosenTeam })
      .then(response => {

        dispatch({ type: UPDATE_CHOICE });
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateChoiceError('Problem with updating choice'));
      })
  }
}

export function signinUser({ email, password }) {
  // Submit email/pwd to server
  // if request is good - update state -> user authd - save JWT Token - redirect to route
  // if request is bad - show error to user

  return function(dispatch) {
    // Submitting email+pwd to the server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // Update state to indicate user auth'd
        dispatch({ type: AUTH_USER, payload: response.data.user });
        // Save JWT Token
        localStorage.setItem('token', response.data.token);
        // redirect to '/feature'
        browserHistory.push('/dashboard'); 
      })
      .catch((err) => {
        // Show an error to user
        console.log(err);
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log('response', response);
        dispatch(authError(response.response.data.error))
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function getDataError(error) {
  return {
    type: GET_DATA_ERROR,
    payload: error
  };
}

export function updateChoiceError(error) {
  return {
    type: UPDATE_CHOICE_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}