import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVehicleById } from '../../actions/clientVehicle';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const ViewVehicle = ({
  getVehicleById,
  clientVehicle: { clientVehicle, loading },
  match: { params },
}) => {
  useEffect(() => {
    getVehicleById(params.vehicle_id);
  }, [getVehicleById, params.vehicle_id]);

  return (
    <Fragment>
      <Navbar />
      {clientVehicle === null || loading ? (
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
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[0]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[1]}
                          alt='Nadeeshans'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[3]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[4]}
                          alt='Nadeeshans'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[5]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + clientVehicle.images[6]}
                          alt='Nadeeshans'
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class='vehicle-view-details'>
                <table class='p-content'>
                  <tbody>
                    <tr>
                      <td class='table-content-header'>Make</td>
                      <td>{clientVehicle.make}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Model</td>
                      <td>{clientVehicle.model}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Condition</td>
                      <td>{clientVehicle.condition}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Manufacture Year</td>
                      <td>{clientVehicle.manufactureYear}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Gear</td>
                      <td>{clientVehicle.gear}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Color</td>
                      <td>{clientVehicle.color}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Mileage</td>
                      <td>{clientVehicle.mileage} KM</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Notes</td>
                      <td>
                        {clientVehicle.specialNotes}{' '}
                        {clientVehicle.seatingCapacity}{' '}
                        {clientVehicle.vehicleRegNo}{' '}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2' class='table-content-price'>
                        {clientVehicle.price} LKR
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to={`/reserve-vehicle/${clientVehicle._id}`}
                  className='btn btn-primary'
                >
                  RESERVE
                </Link>
                <Link
                  to={`/make-offer/${clientVehicle._id}`}
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
  clientVehicle: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  clientVehicle: state.clientVehicle,
});

export default connect(mapStateToProps, { getVehicleById })(ViewVehicle);
