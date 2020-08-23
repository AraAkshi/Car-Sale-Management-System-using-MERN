import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

//Add Profile
export const addClientProfile = (
  formData,
  history
  // vehicle_id
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/clientProfiles`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Client Details Added Successfully', 'success'));

    history.push(`/sale-clients`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Update Profile
export const updateClientProfile = (
  formData,
  history,
  client_id
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/clientProfiles/${client_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Client Details Updated Successfully', 'success'));
    history.push(`/sale-clients`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('api/clientProfiles');

    dispatch({
      type: GET_PROFILES,
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
    const res = await axios.get(`api/clientProfiles/${userId}`);

    dispatch({
      type: GET_PROFILE,
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
      await axios.delete(`api/clientProfiles/${userId}`);

      dispatch({ type: CLEAR_PROFILE });
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
