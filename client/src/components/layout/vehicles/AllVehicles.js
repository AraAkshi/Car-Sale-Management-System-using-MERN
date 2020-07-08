import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VehicleItem from './VehicleItem';
import { getVehicles } from '../../../actions/vehicle';

const AllVehicles = ({ getVehicles, vehicle: { vehicles } }) => {
  useEffect(() => {
    getVehicles();
  }, []);

  console.log(vehicles);

  return (
    <Fragment>
      <h1 className='large text-primary'>On Sale Vehicles</h1>
      <p className='lead'>
        <i className='fas fa-car'></i>Browse the car of your desire. We arrange
        leasing facilities for both Registered and Unregistered Vehicles
      </p>
      <div className='form'>
        <form>
          <div className='form-group'>
            <input
              className='p-content'
              list='allVehicles'
              type='text'
              placeholder='Search On Sale Vehicles'
            />
          </div>
          <button className='btn btn-primary'>Search</button>
        </form>
      </div>
      <div className='vehicles'>
        {vehicles.length >= 0 ? (
          vehicles.map(vehicle => (
            <VehicleItem key={vehicle._id} vehicle={vehicle} />
          ))
        ) : (
          <h5>No vehicles found</h5>
        )}
      </div>
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
