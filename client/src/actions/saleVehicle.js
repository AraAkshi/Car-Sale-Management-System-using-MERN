import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_SALE_VEHICLE,
  GET_SALE_VEHICLES,
  VEHICLE_ERROR,
  DELETE_SALE_VEHICLE,
} from './types';

//Add Sale Vehicles
export const addSaleVehicle = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/api/saleVehicles', formData, config);

    dispatch({
      type: GET_SALE_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert('Vehicle Details Added Successfully', 'success'));

    if (!edit) {
      history.push('/sale-vehicles');
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

//Update Sale Vehicles
export const updateSaleVehicle = (
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

    const res = await axios.put(
      `/api/saleVehicles/${vehicle_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_SALE_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert('Vehicle Details Updated Successfully', 'success'));

    history.push('/sale-vehicles');
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

//Get All Sale Vehicles
export const getSaleVehicles = () => async dispatch => {
  try {
    const res = await axios.get('/api/saleVehicles');

    dispatch({
      type: GET_SALE_VEHICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Sale Vehicle
export const getSaleVehicleById = vehicle_id => async dispatch => {
  try {
    const res = await axios.get(`/api/saleVehicles/${vehicle_id}`);

    dispatch({
      type: GET_SALE_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Sale Vehicle
export const deleteSaleVehicle = (vehicle_id, history) => async dispatch => {
  if (
    window.confirm(
      'Do you want to Delete Vehicle Details? This can NOT be undone!'
    )
  ) {
    try {
      const res = await axios.delete(`/api/saleVehicles/${vehicle_id}`);

      dispatch({ type: DELETE_SALE_VEHICLE });
      history.push(`/dashboard`);
      dispatch(setAlert('Vehicle Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: VEHICLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Sell Sale Vehicles
export const sellSaleVehicle = (vehicle_id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/saleVehicles/sold/${vehicle_id}`, config);

    dispatch({
      type: GET_SALE_VEHICLE,
      payload: res.data,
    });

    dispatch(setAlert('Vehicle Details Updated Successfully', 'success'));
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
