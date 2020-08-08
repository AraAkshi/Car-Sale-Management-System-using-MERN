import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VehicleItem from './VehicleItem';
import { getVehicles } from '../../actions/vehicle';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const AllVehicles = ({ getVehicles, vehicle: { vehicles, loading } }) => {
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
                <i className='fas fa-car'></i>On Sale Vehicles
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
                {vehicles.length > 0 ? (
                  vehicles.map(vehicle => (
                    <VehicleItem key={vehicle._id} vehicle={vehicle} />
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

AllVehicles.propTypes = {
  getVehicles: PropTypes.func.isRequired,
  vehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
});

export default connect(mapStateToProps, { getVehicles })(AllVehicles);
