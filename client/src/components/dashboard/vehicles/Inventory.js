import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getSaleVehicles } from '../../../actions/saleVehicle';
import Spinner from '../../layout/Spinner';

const Inventory = ({
  getSaleVehicles,
  saleVehicle: { saleVehicles, loading },
}) => {
  useEffect(() => {
    getSaleVehicles();
  }, [getSaleVehicles]);
  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
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
                    placeholder='Search all Sale Vehicles'
                  />
                  <input
                    type='button'
                    className='btn btn-search'
                    value='Search'
                  />
                </div>
                {/* <div className='searchFilters'>
                  <select name='model' id='model' placeholder='MODEL'>
                    <option value='MODEL' disabled></option>
                  </select>
                  <select name='make' id='make'>
                    <option value='MAKE' disabled></option>
                  </select>
                  <select name='year' id='year'>
                    <option value='YEAR' disabled></option>
                  </select>
                </div> */}
              </form>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>CONDITION</th>
                      <th>MAKE</th>
                      <th>MODEL</th>
                      <th>MILEAGE</th>
                      <th>YEAR</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleVehicles.length > 0 ? (
                      saleVehicles.map(vehicle => (
                        <tr>
                          <td>{vehicle.condition}</td>
                          <td>{vehicle.make}</td>
                          <td>{vehicle.model}</td>
                          <td>{vehicle.mileage}</td>
                          <td>{vehicle.manufactureYear}</td>
                          <td>
                            <Link
                              to={`sale-vehicles/${vehicle._id}`}
                              className='btn btn-search'
                            >
                              <i className='fa fa-eye' aria-hidden='true'></i>
                              View
                            </Link>
                            <Link
                              to={`sale-vehicles/edit/${vehicle._id}`}
                              className='btn btn-success'
                            >
                              <i
                                className='fa fa-pencil-square-o'
                                aria-hidden='true'
                              ></i>
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='5'> No vehicles found </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Link to='/sale-vehicle/add-vehicle' className='btn btn-primary'>
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
  getSaleVehicles: PropTypes.func.isRequired,
  saleVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
});

export default connect(mapStateToProps, { getSaleVehicles })(Inventory);
