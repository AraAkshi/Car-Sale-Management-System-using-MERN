import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OnlineVehicleItem from './OnlineVehicleItem';
import { getVehicles } from '../../actions/clientVehicle';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const OnlineVehicles = ({
  getVehicles,
  clientVehicle: { clientVehicles, loading },
}) => {
  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className='large text-primary'>
                <i className='fas fa-car'></i>Client Vehicles
              </h1>
              <div className='searchBar'>
                <form>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='allVehicles'
                      id='allVehicles'
                      placeholder='Search On Sale Vehicles'
                    />
                  </div>
                  <input
                    type='button'
                    value='Search'
                    className='btn btn-primary'
                  />
                </form>
              </div>
              <div className='vehicles'>
                {clientVehicles.length > 0 ? (
                  clientVehicles.map(clientVehicle => (
                    <OnlineVehicleItem
                      key={clientVehicle._id}
                      clientVehicle={clientVehicle}
                    />
                  ))
                ) : (
                  <h5>No vehicles found</h5>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

OnlineVehicles.propTypes = {
  getVehicles: PropTypes.func.isRequired,
  clientVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  clientVehicle: state.clientVehicle,
});

export default connect(mapStateToProps, { getVehicles })(OnlineVehicles);
