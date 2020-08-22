import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

//Add / Update Employees
export const addEmployee = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/employees`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Employee Details Updated Successfully'
          : 'Employee Details Added Successfully',
        'success'
      )
    );

    if (!edit) {
      history.push(`/employees`);
    }
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
export const getEmployees = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('api/employees');

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
export const getEmployeeById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/employees/${userId}`);

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
export const deleteEmployee = userId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`api/employees/${userId}`);

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
