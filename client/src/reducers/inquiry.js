import { GET_INQUIRY, INQUIRY_ERROR, GET_INQUIRIES } from '../actions/types';

const initialState = {
  inquiry: null,
  inquiries: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INQUIRY:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case GET_INQUIRIES:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };
    case INQUIRY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
