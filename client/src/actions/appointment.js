import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  APPOINTMENT_ERROR,
  DELETE_APPOINTMENT,
} from './types';

//Add Appointments
export const addAppointment = (
  formData,
  vehicle_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/appointments/${vehicle_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Appointment Details Added Successfully', 'success'));

    history.push(`/on-sale-vehicles/${vehicle_id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Add Sale Appointments
export const addSaleAppointment = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/appointments`, formData, config);

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Appointment Details Added Successfully', 'success'));

    history.push(`/appointments`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Logged User Appointments
export const getAppointmentByLoggedUserId = () => async dispatch => {
  try {
    const res = await axios.get(`/api/appointments/my-appointments`);

    dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get A User's Appointments
export const getAppointmentByUserId = client_id => async dispatch => {
  try {
    const res = await axios.get(`/api/appointments/${client_id}`);

    dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Appointments
export const getAppointments = () => async dispatch => {
  try {
    const res = await axios.get('/api/appointments');

    dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Appointment
export const getAppointmentById = appointment_id => async dispatch => {
  try {
    const res = await axios.get(`/api/appointments/${appointment_id}`);

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Inquiry
export const deleteAppointment = (
  appointment_id,
  history
) => async dispatch => {
  if (
    window.confirm(
      'Do you want to Delete the Appointment? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(`/api/appointments/${appointment_id}`);

      dispatch({ type: DELETE_APPOINTMENT });
      history.push(`/dashboard`);
      dispatch(setAlert('Appointment Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Update Inquiry
export const updateAppointment = (
  formData,
  appointment_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/appointments/${appointment_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Appointment Details Updated Successfully'));

    history.push(`/appointments`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
