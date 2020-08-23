import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getSaleVehicles, getSoldVehicles } from '../../../actions/saleVehicle';
import Spinner from '../../layout/Spinner';

const Inventory = ({
  getSaleVehicles,
  getSoldVehicles,
  saleVehicle: { soldVehicles, saleVehicles, loading },
}) => {
  useEffect(() => {
    getSaleVehicles();
    getSoldVehicles();
  }, [getSaleVehicles, getSoldVehicles]);
  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <Link
          to='/sale-vehicle/add-vehicle'
          className='btn btn-primary'
          style={{ position: 'relative', left: '500px', marginBottom: '20px' }}
        >
          ADD VEHICLE
        </Link>
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className='form'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-dashboard'
                    placeholder='Search all Sale Vehicles'
                  />
                </div>
              </form>
              <p className='headers'>
                <i className='fa fa-car' aria-hidden='true'></i> In Sale
                Vehicles
              </p>
              <div
                className='display-table'
                style={{ position: 'relative', bottom: '30px' }}
              >
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
                        <tr key={vehicle._id}>
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
            </Fragment>
          )}
        </Fragment>
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <p className='headers'>
                <i className='fa fa-car' aria-hidden='true'></i>
                <i className='fa fa-arrow-right' aria-hidden='true'></i> Sold
                Vehicles
              </p>
              <div
                className='display-table'
                style={{ position: 'relative', bottom: '30px' }}
              >
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
                    {soldVehicles.length > 0 ? (
                      soldVehicles.map(vehicle => (
                        <tr key={vehicle._id}>
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
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Inventory.propTypes = {
  getSaleVehicles: PropTypes.func.isRequired,
  getSoldVehicles: PropTypes.func.isRequired,
  saleVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
});

export default connect(mapStateToProps, { getSaleVehicles, getSoldVehicles })(
  Inventory
);
