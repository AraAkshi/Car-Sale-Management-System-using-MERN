import { GET_OFFER, GET_OFFERS, OFFER_ERROR } from '../actions/types';

const initialState = {
  offer: null,
  offers: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OFFER:
      return {
        ...state,
        offer: payload,
        loading: false,
      };
    case GET_OFFERS:
      return {
        ...state,
        offers: payload,
        loading: false,
      };
    case OFFER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
