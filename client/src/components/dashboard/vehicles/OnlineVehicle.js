import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getVehicles } from '../../../actions/clientVehicle';
import Spinner from '../../layout/Spinner';

const OnlineVehicle = ({
  getVehicles,
  clientVehicle: { clientVehicles, loading },
}) => {
  useEffect(() => {
    getVehicles();
  }, [getVehicles]);
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
              <form className='form'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-dashboard'
                    placeholder='Search all Sale Vehicles'
                  />
                </div>
              </form>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>CONDITION</th>
                      <th>MODEL</th>
                      <th>MAKE</th>
                      <th>MILEAGE</th>
                      <th>YEAR</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientVehicles.length > 0 ? (
                      clientVehicles.map(vehicle => (
                        <tr key={vehicle._id}>
                          <td>{vehicle.condition}</td>
                          <td>{vehicle.model}</td>
                          <td>{vehicle.make}</td>
                          <td>{vehicle.mileage}</td>
                          <td>{vehicle.manufactureYear}</td>
                          <td>
                            <Link
                              to={`online-vehicle/${vehicle._id}`}
                              className='btn btn-search'
                            >
                              <i className='fa fa-eye' aria-hidden='true'></i>
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='6'> No vehicles found </td>
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

OnlineVehicle.propTypes = {
  getVehicles: PropTypes.func.isRequired,
  clientVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  clientVehicle: state.clientVehicle,
});

export default connect(mapStateToProps, { getVehicles })(OnlineVehicle);
