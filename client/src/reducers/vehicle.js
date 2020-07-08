import { GET_VEHICLE, VEHICLE_ERROR, GET_VEHICLES } from '../actions/types';

const initialState = {
  vehicle: null,
  vehicles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VEHICLE:
      return {
        ...state,
        vehicle: payload,
        loading: false,
      };
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: payload,
        loading: false,
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
