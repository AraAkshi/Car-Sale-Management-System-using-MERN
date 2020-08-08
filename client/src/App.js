import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';
import StaffPrivateRoute from './components/routing/StaffPrivateRoute';
import Landing from './components/layout/Landing';
import Contact from './components/layout/Contact';
import Login from './components/auth/Login';
import StaffLogin from './components/auth/StaffLogin';
import Register from './components/auth/Register';
import Vehicles from './components/vehicles/AllVehicles';
import AddVehicle from './components/vehicles/AddVehicle';
import ViewVehicle from './components/vehicles/ViewVehicle';
import AddAppointment from './components/AddAppointment';
import AddOffer from './components/AddOffer';
import Dashboard from './components/dashboard/Dashboard';
import Inventory from './components/dashboard/Inventory';
import Inquiry from './components/dashboard/Inquiry';
import Appointment from './components/dashboard/Appointment';
import Report from './components/dashboard/Report';
import User from './components/dashboard/User';
import { loadUser } from './actions/clientAuth';
import setAuthToken from './utils/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <StaffPrivateRoute exact path='/dashboard' component={Dashboard} />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/login-staff' component={StaffLogin} />
            <Route exact path='/on-sale-vehicles' component={Vehicles} />
            <Route exact path='/contact-us' component={Contact} />
            <Route
              exact
              path='/on-sale-vehicles/:vehicle_id'
              component={ViewVehicle}
            />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/sell-vehicle' component={AddVehicle} />
            <PrivateRoute
              exact
              path='/make-offer/:vehicle_id'
              component={AddOffer}
            />
            <PrivateRoute
              exact
              path='/reserve-vehicle/:vehicle_id'
              component={AddAppointment}
            />
          </Switch>
          <Switch>
            <StaffPrivateRoute exact path='/inventory' component={Inventory} />
            <StaffPrivateRoute exact path='/inquiries' component={Inquiry} />
            <StaffPrivateRoute
              exact
              path='/appointments'
              component={Appointment}
            />
            <StaffPrivateRoute exact path='/reports' component={Report} />
            <StaffPrivateRoute exact path='/users' component={User} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
