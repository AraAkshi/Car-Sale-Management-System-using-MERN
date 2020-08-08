import axios from 'axios';
import { setAlert } from './alerts';

import { GET_INQUIRY, GET_INQUIRIES, INQUIRY_ERROR } from './types';

//Add / Update Inquiry
export const addInquiry = (
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

    const res = await axios.post('/api/inquiries', formData, config);

    dispatch({
      type: GET_INQUIRY,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Inquiry Details Updated Successfully'
          : 'Inquiry Details Added Successfully',
        'success'
      )
    );
    if (!edit) {
      history.push(`/on-sale-vehicles`);
    }
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
