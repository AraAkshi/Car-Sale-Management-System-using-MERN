import axios from 'axios';
import { setAlert } from './alerts';

import { GET_OFFER, GET_OFFERS, OFFER_ERROR } from './types';

//Add / Update Offers
export const addOffer = (
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

    const res = await axios.post(`/api/offers/${vehicle_id}`, formData, config);

    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Offer Details Updated Successfully'
          : 'Offer Details Added Successfully',
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
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Logged User Offers
export const getOfferByUserId = () => async dispatch => {
  try {
    const res = await axios.get(`/api/vehicles/my-offers`);

    dispatch({
      type: GET_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Offers
export const getOffers = () => async dispatch => {
  try {
    const res = await axios.get('/api/offers');

    dispatch({
      type: GET_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Offer
export const getOfferById = offer_id => async dispatch => {
  try {
    const res = await axios.get(`/api/offers/${offer_id}`);

    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: OFFER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
