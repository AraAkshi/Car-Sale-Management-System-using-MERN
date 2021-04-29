import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import saleVehicle from './saleVehicle';
import clientVehicle from './clientVehicle';
import appointment from './appointment';
import offer from './offer';
import inquiry from './inquiry';
import clientProfile from './onlineUserProfile';
import profile from './saleUserProfile';
import report from './report';
import employee from './employee';

export default combineReducers({
  alerts,
  auth,
  saleVehicle,
  clientVehicle,
  appointment,
  offer,
  inquiry,
  clientProfile,
  profile,
  report,
  employee,
});
