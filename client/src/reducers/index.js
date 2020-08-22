import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import saleVehicle from './saleVehicle';
import clientVehicle from './clientVehicle';
import appointment from './appointment';
import offer from './offer';
import inquiry from './inquiry';
import onlineUserProfile from './onlineUserProfile';
import saleUserProfile from './saleUserProfile';

export default combineReducers({
  alerts,
  auth,
  saleVehicle,
  clientVehicle,
  appointment,
  offer,
  inquiry,
  onlineUserProfile,
  saleUserProfile,
});
