import axios from 'axios';
import { setAlert } from './alerts';

import { GET_VEHICLE, GET_VEHICLES, VEHICLE_ERROR } from './types';

//Add / Update Vehicles
export const addVehicle = (
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

    const res = await axios.post('/api/vehicles', formData, config);

    dispatch({
      type: GET_VEHICLE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Vehicle Details Updated Successfully'
          : 'Vehicle Details Added Successfully',
        'success'
      )
    );

    if (!edit) {
      history.push('/on-sale-vehicles');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Vehicles
export const getVehicles = () => async dispatch => {
  try {
    const res = await axios.get('/api/vehicles');

    dispatch({
      type: GET_VEHICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Vehicle
export const getVehicleById = vehicle_id => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/${vehicle_id}`);

    dispatch({
      type: GET_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
