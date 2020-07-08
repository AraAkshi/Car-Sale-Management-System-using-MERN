import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/homepage/Landing';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Vehicles from './components/layout/vehicles/AllVehicles';
import AddVehicle from './components/layout/AddVehicle';
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
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alerts />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/on-sale-vehicles' component={Vehicles} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/sell-vehicle' component={AddVehicle} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
