import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import vehicle from './vehicle';
import appointment from './appointment';
import offer from './offer';
import inquiry from './inquiry';

export default combineReducers({
  alerts,
  auth,
  vehicle,
  appointment,
  offer,
  inquiry,
});
