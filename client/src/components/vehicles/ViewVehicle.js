import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVehicleById } from '../../actions/vehicle';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const ViewVehicle = ({
  getVehicleById,
  vehicle: { vehicle, loading },
  auth,
  match: { params },
}) => {
  useEffect(() => {
    getVehicleById(params.vehicle_id);
  }, [getVehicleById, params.vehicle_id]);

  return (
    <Fragment>
      <Navbar />
      {vehicle === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='container'>
            <Alerts />
            <p class='large'>
              <i class='fas fa-car'></i>Vehicle Details
            </p>
            <div class='vehicle'>
              <div class='vehicle-view-images'>
                <table>
                  <tr>
                    <td>
                      <img src={vehicle.images[0]} alt='Nadeeshans' />
                    </td>
                    <td>
                      <img src={vehicle.images[1]} alt='Nadeeshans' />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={vehicle.images[3]} alt='Nadeeshans' />
                    </td>
                    <td>
                      <img src={vehicle.images[4]} alt='Nadeeshans' />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={vehicle.images[5]} alt='Nadeeshans' />
                    </td>
                    <td>
                      <img src={vehicle.images[6]} alt='Nadeeshans' />
                    </td>
                  </tr>
                </table>
              </div>
              <div class='vehicle-view-details'>
                <table class='p-content'>
                  <tr>
                    <td class='table-content-header'>Make</td>
                    <td>{vehicle.make}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Model</td>
                    <td>{vehicle.model}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Condition</td>
                    <td>{vehicle.condition}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Manufacture Year</td>
                    <td>{vehicle.manufactureYear}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Gear</td>
                    <td>{vehicle.gear}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Color</td>
                    <td>{vehicle.color}</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Mileage</td>
                    <td>{vehicle.mileage} KM</td>
                  </tr>
                  <tr>
                    <td class='table-content-header'>Notes</td>
                    <td>
                      {vehicle.specialNotes} {vehicle.seatingCapacity}{' '}
                      {vehicle.vehicleRegNo}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td colspan='2' class='table-content-price'>
                      {vehicle.price} LKR
                    </td>
                  </tr>
                </table>
                <Link
                  to={`/reserve-vehicle/${vehicle._id}`}
                  className='btn btn-primary'
                >
                  RESERVE
                </Link>
                <Link
                  to={`/make-offer/${vehicle._id}`}
                  className='btn btn-primary'
                >
                  MAKE OFFER
                </Link>
                <Link to='/on-sale-vehicles' className='btn btn-secondary'>
                  Go Back
                </Link>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewVehicle.propTypes = {
  getVehicleById: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVehicleById })(ViewVehicle);
