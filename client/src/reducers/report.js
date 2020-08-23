import {
  GET_REPORT,
  REPORT_ERRORS,
  GET_REPORTS,
  DELETE_REPORT,
} from '../actions/types';

const initialState = {
  report: null,
  reports: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORT:
      return {
        ...state,
        report: payload,
        loading: false,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: payload,
        loading: false,
      };
    case REPORT_ERRORS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_REPORT:
      return {
        ...state,
        report: null,
        loading: false,
      };
    default:
      return state;
  }
}
