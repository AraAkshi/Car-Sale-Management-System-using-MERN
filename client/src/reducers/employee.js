import {
  GET_EMPLOYEE_PROFILE,
  EMPLOYEE_PROFILE_ERROR,
  CLEAR_EMPLOYEE_PROFILE,
  GET_EMPLOYEE_PROFILES,
} from '../actions/types';

const initialState = {
  employee: null,
  employees: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: payload,
        loading: false,
      };
    case GET_EMPLOYEE_PROFILES:
      return {
        ...state,
        employees: payload,
        loading: false,
      };
    case EMPLOYEE_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        employee: null,
      };
    case CLEAR_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: null,
      };
    default:
      return state;
  }
}
