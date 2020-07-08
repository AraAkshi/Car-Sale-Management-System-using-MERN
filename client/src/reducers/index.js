import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import vehicle from './vehicle';

export default combineReducers({
  alerts,
  auth,
  vehicle,
});
