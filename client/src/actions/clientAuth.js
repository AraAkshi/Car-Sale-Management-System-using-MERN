import axios from 'axios';
import { setAlert } from './alerts';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/clientAuth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({
  name,
  email,
  houseNo,
  streetName,
  city,
  contact,
  password,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    houseNo,
    streetName,
    city,
    contact,
    password,
  });

  try {
    const res = await axios.post('/api/customers', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
    console.log(dispatch.type);
  }
};

//Login User
export const clientLogin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/clientAuth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
    console.log(dispatch.type);
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
