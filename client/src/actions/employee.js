import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_EMPLOYEE_PROFILE,
  GET_EMPLOYEE_PROFILES,
  EMPLOYEE_PROFILE_ERROR,
  CLEAR_EMPLOYEE_PROFILE,
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
      type: GET_EMPLOYEE_PROFILE,
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
      type: EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getEmployees = () => async dispatch => {
  dispatch({ type: CLEAR_EMPLOYEE_PROFILE });

  try {
    const res = await axios.get('api/employees');

    dispatch({
      type: GET_EMPLOYEE_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getEmployeeById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/employees/${userId}`);

    dispatch({
      type: GET_EMPLOYEE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteEmployee = userId => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`api/employees/${userId}`);

      dispatch({ type: CLEAR_EMPLOYEE_PROFILE });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: EMPLOYEE_PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
