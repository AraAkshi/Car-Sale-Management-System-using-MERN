import {
  GET_INQUIRY,
  INQUIRY_ERROR,
  GET_INQUIRIES,
  DELETE_INQUIRY,
} from '../actions/types';

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
        inquiry: payload,
        loading: false,
      };
    case GET_INQUIRIES:
      return {
        ...state,
        inquiries: payload,
        loading: false,
      };
    case INQUIRY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_INQUIRY:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
