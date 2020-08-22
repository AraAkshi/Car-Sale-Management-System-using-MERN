import {
  GET_CLIENT_PROFILE,
  PROFILE_ERROR,
  UPDATE_CLIENT_PROFILE,
  CLEAR_CLIENT_PROFILE,
  GET_CLIENT_PROFILES,
} from '../actions/types';

const initialState = {
  clientProfile: null,
  clientProfiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENT_PROFILE:
    case UPDATE_CLIENT_PROFILE:
      return {
        ...state,
        clientProfile: payload,
        loading: false,
      };
    case GET_CLIENT_PROFILES:
      return {
        ...state,
        clientProfiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        clientProfile: null,
      };
    case CLEAR_CLIENT_PROFILE:
      return {
        ...state,
        clientProfile: null,
      };
    default:
      return state;
  }
}
