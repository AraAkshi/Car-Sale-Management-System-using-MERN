import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_CLIENT_PROFILE,
  GET_CLIENT_PROFILES,
  PROFILE_ERROR,
  CLEAR_CLIENT_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profiles/me');

    dispatch({
      type: GET_CLIENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_CLIENT_PROFILE });

  try {
    const res = await axios.get('api/profiles');

    dispatch({
      type: GET_CLIENT_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/profiles/${userId}`);

    dispatch({
      type: GET_CLIENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = userId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`api/profiles/${userId}`);

      dispatch({ type: CLEAR_CLIENT_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
