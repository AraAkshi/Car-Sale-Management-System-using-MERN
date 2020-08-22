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
import SaleVehicles from './components/vehicles/AllVehicles';
import ClientVehicles from './components/vehicles/OnlineVehicles';
import AddVehicle from './components/vehicles/AddVehicle';
import ViewVehicle from './components/vehicles/ViewSaleVehicle';
import ViewClientVehicle from './components/vehicles/ViewOnlineVehicle';
import AddAppointment from './components/AddAppointment';
import AddOffer from './components/AddOffer';
import Dashboard from './components/dashboard/Dashboard';
import Inventory from './components/dashboard/vehicles/Inventory';
import OnlineVehicles from './components/dashboard/vehicles/OnlineVehicle';
import AddSaleVehicle from './components/dashboard/vehicles/AddVehicle';
import EditSaleVehicle from './components/dashboard/vehicles/EditVehicle';
import ViewSaleVehicle from './components/dashboard/vehicles/ViewSaleVehicle';
import ViewOnlineVehicle from './components/dashboard/vehicles/ViewOnlineVehicle';
import AddDirectClient from './components/dashboard/users/AddDirectClient';
import Inquiry from './components/dashboard/inquiries/Inquiry';
import SaleAddInquiry from './components/dashboard/inquiries/AddInquiry';
import SaleEditInquiry from './components/dashboard/inquiries/EditInquiry';
import Appointment from './components/dashboard/appointments/Appointment';
import AddSaleAppointment from './components/dashboard/appointments/AddAppointment';
import EditAppointment from './components/dashboard/appointments/EditAppointment';
import Report from './components/dashboard/Report';
import OnlineUser from './components/dashboard/users/OnlineUser';
import Employee from './components/dashboard/users/Employee';
import SaleClient from './components/dashboard/users/DirectClient';
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
            <Route exact path='/on-sale-vehicles' component={SaleVehicles} />
            <Route exact path='/client-vehicles' component={ClientVehicles} />
            <Route exact path='/contact-us' component={Contact} />
            <Route
              exact
              path='/on-sale-vehicles/:vehicle_id'
              component={ViewVehicle}
            />
            <Route
              exact
              path='/client-vehicles/:vehicle_id'
              component={ViewClientVehicle}
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
            <StaffPrivateRoute
              exact
              path='/sale-vehicles'
              component={Inventory}
            />
            <StaffPrivateRoute
              exact
              path='/online-vehicles'
              component={OnlineVehicles}
            />
            <StaffPrivateRoute
              exact
              path='/sale-vehicle/add-vehicle'
              component={AddSaleVehicle}
            />
            <StaffPrivateRoute
              exact
              path='/sale-vehicles/:vehicle_id'
              component={ViewSaleVehicle}
            />
            <StaffPrivateRoute
              exact
              path='/sale-vehicles/edit/:vehicle_id'
              component={EditSaleVehicle}
            />
            <StaffPrivateRoute
              exact
              path='/sale-vehicles/sale-vehicles/edit/:vehicle_id'
              component={EditSaleVehicle}
            />
            <StaffPrivateRoute
              exact
              path='/sale-vehicles/sale-vehicles/sold/:vehicle_id'
              component={AddDirectClient}
            />
            <StaffPrivateRoute
              exact
              path='/online-vehicle/:vehicle_id'
              component={ViewOnlineVehicle}
            />
            <StaffPrivateRoute exact path='/inquiries' component={Inquiry} />
            <StaffPrivateRoute
              exact
              path='/inquiries/add-inquiry'
              component={SaleAddInquiry}
            />
            <StaffPrivateRoute
              exact
              path='/inquiries/edit/:inquiry_id'
              component={SaleEditInquiry}
            />
            <StaffPrivateRoute
              exact
              path='/appointments'
              component={Appointment}
            />
            <StaffPrivateRoute
              exact
              path='/appointments/add-appointment'
              component={AddSaleAppointment}
            />
            <StaffPrivateRoute
              exact
              path='/appointments/edit/:appointment_id'
              component={EditAppointment}
            />
            <StaffPrivateRoute exact path='/reports' component={Report} />
            <StaffPrivateRoute
              exact
              path='/online-clients'
              component={OnlineUser}
            />
            <StaffPrivateRoute
              exact
              path='/sale-clients'
              component={SaleClient}
            />
            <StaffPrivateRoute exact path='/employees' component={Employee} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
