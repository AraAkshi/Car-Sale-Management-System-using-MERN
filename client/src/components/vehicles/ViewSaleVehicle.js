import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSaleVehicleById } from '../../actions/saleVehicle';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const ViewVehicle = ({
  getSaleVehicleById,
  saleVehicle: { saleVehicle, loading },
  match: { params },
}) => {
  useEffect(() => {
    getSaleVehicleById(params.vehicle_id);
  }, [getSaleVehicleById, params.vehicle_id]);

  return (
    <Fragment>
      <Navbar />
      {saleVehicle === null || loading ? (
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
                          src={'/' + saleVehicle.images[0]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + saleVehicle.images[1]}
                          alt='Nadeeshans'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={'/' + saleVehicle.images[3]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + saleVehicle.images[4]}
                          alt='Nadeeshans'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          src={'/' + saleVehicle.images[5]}
                          alt='Nadeeshans'
                        />
                      </td>
                      <td>
                        <img
                          src={'/' + saleVehicle.images[6]}
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
                      <td>{saleVehicle.make}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Model</td>
                      <td>{saleVehicle.model}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Condition</td>
                      <td>{saleVehicle.condition}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Manufacture Year</td>
                      <td>{saleVehicle.manufactureYear}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Gear</td>
                      <td>{saleVehicle.gear}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Color</td>
                      <td>{saleVehicle.color}</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Mileage</td>
                      <td>{saleVehicle.mileage} KM</td>
                    </tr>
                    <tr>
                      <td class='table-content-header'>Notes</td>
                      <td>
                        {saleVehicle.specialNotes} {saleVehicle.seatingCapacity}{' '}
                        {saleVehicle.vehicleRegNo}{' '}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='2' class='table-content-price'>
                        {saleVehicle.price} LKR
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to={`/reserve-vehicle/${saleVehicle._id}`}
                  className='btn btn-primary'
                >
                  RESERVE
                </Link>
                <Link
                  to={`/make-offer/${saleVehicle._id}`}
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
  getSaleVehicleById: PropTypes.func.isRequired,
  saleVehicle: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
});

export default connect(mapStateToProps, { getSaleVehicleById })(ViewVehicle);
