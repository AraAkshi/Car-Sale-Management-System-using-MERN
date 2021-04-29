import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_BUYER_PROFILE,
  GET_BUYER_PROFILES,
  BUYER_PROFILE_ERROR,
  CLEAR_BUYER_PROFILE,
} from './types';

//Add Profile
export const addBuyerProfile = (
  formData,
  history,
  vehicle_id
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/buyerProfile/${vehicle_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_BUYER_PROFILE,
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
      type: BUYER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Update Profile
export const updateBuyerProfile = (
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
      `/api/buyerProfile/${client_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_BUYER_PROFILE,
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
      type: BUYER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_BUYER_PROFILE });

  try {
    const res = await axios.get('api/buyerProfile');

    dispatch({
      type: GET_BUYER_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUYER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/buyerProfile/${userId}`);

    dispatch({
      type: GET_BUYER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUYER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = userId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`api/buyerProfile/${userId}`);

      dispatch({ type: CLEAR_BUYER_PROFILE });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: BUYER_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
