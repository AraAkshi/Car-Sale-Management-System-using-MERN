import {
  GET_SALE_VEHICLE,
  SALE_VEHICLE_ERROR,
  GET_SALE_VEHICLES,
  GET_SOLD_VEHICLES,
  DELETE_SALE_VEHICLE,
} from '../actions/types';

const initialState = {
  saleVehicle: null,
  saleVehicles: [],
  soldVehicles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALE_VEHICLE:
      return {
        ...state,
        saleVehicle: payload,
        loading: false,
      };
    case GET_SALE_VEHICLES:
      return {
        ...state,
        saleVehicles: payload,
        loading: false,
      };
    case GET_SOLD_VEHICLES:
      return {
        ...state,
        soldVehicles: payload,
        loading: false,
      };
    case SALE_VEHICLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_SALE_VEHICLE:
      return {
        ...state,
        saleVehicle: null,
        loading: false,
      };
    default:
      return state;
  }
}
