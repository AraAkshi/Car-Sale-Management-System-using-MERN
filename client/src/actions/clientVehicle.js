import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_CLIENT_VEHICLE,
  GET_CLIENT_VEHICLES,
  CLIENT_VEHICLE_ERROR,
  DELETE_CLIENT_VEHICLE,
} from './types';

//Add Online Vehicles
export const addVehicle = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/api/vehicles', formData, config);

    dispatch({
      type: GET_CLIENT_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert('Vehicle Details Added Successfully', 'success'));
    history.push('/on-sale-vehicles');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Online Vehicles
export const updateVehicle = (
  formData,
  vehicle_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(
      `/api/vehicles/${vehicle_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_CLIENT_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert('Vehicle Details Updated Successfully', 'success'));
    history.push('/on-sale-vehicles');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Logged User Vehicles
export const getVehicleByLoggedUserId = () => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/my-vehicles`);

    dispatch({
      type: GET_CLIENT_VEHICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get a User's Vehicles
export const getVehicleByUserId = client_id => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/${client_id}`);

    dispatch({
      type: GET_CLIENT_VEHICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All online Vehicles
export const getVehicles = () => async dispatch => {
  try {
    const res = await axios.get('/api/vehicles');

    dispatch({
      type: GET_CLIENT_VEHICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Vehicle
export const getVehicleById = vehicle_id => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/${vehicle_id}`);

    dispatch({
      type: GET_CLIENT_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Client Vehicle
export const deleteClientVehicle = (vehicle_id, history) => async dispatch => {
  if (
    window.confirm(
      'Do you want to Delete Vehicle Details? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(`/api/vehicles/${vehicle_id}`);

      dispatch({ type: DELETE_CLIENT_VEHICLE });
      history.push(`/dashboard`);
      dispatch(setAlert('Vehicle Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: CLIENT_VEHICLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
