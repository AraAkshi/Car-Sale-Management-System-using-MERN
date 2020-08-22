import {
  GET_CLIENT_VEHICLE,
  VEHICLE_ERROR,
  DELETE_CLIENT_VEHICLE,
  GET_CLIENT_VEHICLES,
} from '../actions/types';

const initialState = {
  clientVehicle: null,
  clientVehicles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENT_VEHICLE:
      return {
        ...state,
        clientVehicle: payload,
        loading: false,
      };
    case GET_CLIENT_VEHICLES:
      return {
        ...state,
        clientVehicles: payload,
        loading: false,
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_CLIENT_VEHICLE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
