import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';
import { getVehicles } from '../../actions/vehicle';
import Spinner from '../layout/Spinner';

const Inventory = ({ getVehicles, vehicle: { vehicles, loading } }) => {
  useEffect(() => {
    getVehicles();
  }, [getVehicles]);
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className='form-allVehicles'>
                <div className='searchBar'>
                  <input
                    type='text'
                    name='allVehicles'
                    id='allVehicles'
                    placeholder='Search all Vehicles'
                  />
                  <input
                    type='button'
                    className='btn btn-search'
                    value='Search'
                  />
                </div>
                <div className='searchFilters'>
                  <select name='model' id='model' placeholder='MODEL'>
                    <option value='MODEL' disabled></option>
                  </select>
                  <select name='make' id='make'>
                    <option value='MAKE' disabled></option>
                  </select>
                  <select name='year' id='year'>
                    <option value='YEAR' disabled></option>
                  </select>
                </div>
              </form>
              <table>
                <tr>
                  <th>CONDITION</th>
                  <th>MODEL</th>
                  <th>MAKE</th>
                  <th>MILEAGE</th>
                  <th>YEAR</th>
                </tr>
                {vehicles.length > 0 ? (
                  vehicles.map(vehicle => (
                    <tr>
                      <td>{vehicle.condition}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.make}</td>
                      <td>{vehicle.mileage}</td>
                      <td>{vehicle.manufactureYear}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan='5'> No vehicles found </td>
                  </tr>
                )}
              </table>
              <Link to='/add-vehicle' className='btn btn-dark'>
                ADD VEHICLE
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Inventory.propTypes = {
  getVehicles: PropTypes.func.isRequired,
  vehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
});

export default connect(mapStateToProps, { getVehicles })(Inventory);
