import {
  GET_BUYER_PROFILE,
  BUYER_PROFILE_ERROR,
  UPDATE_BUYER_PROFILE,
  CLEAR_BUYER_PROFILE,
  GET_BUYER_PROFILES,
} from '../actions/types';

const initialState = {
  buyerProfile: null,
  buyerProfiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BUYER_PROFILE:
    case UPDATE_BUYER_PROFILE:
      return {
        ...state,
        buyerProfile: payload,
        loading: false,
      };
    case GET_BUYER_PROFILES:
      return {
        ...state,
        buyerProfiles: payload,
        loading: false,
      };
    case BUYER_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        buyerProfile: null,
      };
    case CLEAR_BUYER_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
