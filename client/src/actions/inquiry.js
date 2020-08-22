import axios from 'axios';
import { setAlert } from './alerts';

import {
  GET_INQUIRY,
  GET_INQUIRIES,
  INQUIRY_ERROR,
  DELETE_INQUIRY,
} from './types';

//Add Inquiry
export const addInquiry = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/inquiries', formData, config);

    dispatch({
      type: GET_INQUIRY,
      payload: res.data,
    });

    dispatch(setAlert('Inquiry Details Added Successfully', 'success'));
    history.push(`/on-sale-vehicles`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Inquiries
export const getInquiries = () => async dispatch => {
  try {
    const res = await axios.get('/api/inquiries');

    dispatch({
      type: GET_INQUIRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Inquiry
export const getInquiryById = inquiry_id => async dispatch => {
  try {
    const res = await axios.get(`/api/inquiries/${inquiry_id}`);

    dispatch({
      type: GET_INQUIRY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Inquiry
export const deleteInquiry = (inquiry_id, history) => async dispatch => {
  if (
    window.confirm('Do you want to Delete the Inquiry? This can NOT be undone!')
  ) {
    try {
      const res = await axios.delete(`/api/inquiries/${inquiry_id}`);

      dispatch({ type: DELETE_INQUIRY });
      history.push(`/dashboard`);
      dispatch(setAlert('Inquiry Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: INQUIRY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Update Inquiry
export const updateInquiry = (
  formData,
  inquiry_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/inquiries/${inquiry_id}`,
      formData,
      config
    );

    dispatch({
      type: GET_INQUIRY,
      payload: res.data,
    });

    dispatch(setAlert('Inquiry Details Updated Successfully', 'success'));
    history.push(`/inquiries`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
