import axios from 'axios';
import { setAlert } from './alerts';

import { GET_APPOINTMENT, GET_APPOINTMENTS, APPOINTMENT_ERROR } from './types';

//Add / Update Appointments
export const addAppointment = (
  formData,
  vehicle_id,
  history,
  edit = false
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

    dispatch(
      setAlert(
        edit
          ? 'Appointment Details Updated Successfully'
          : 'Appointment Details Added Successfully',
        'success'
      )
    );

    if (!edit) {
      history.push(`/on-sale-vehicles/${vehicle_id}`);
    }
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
export const getAppointmentByUserId = () => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/my-appointments`);

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
