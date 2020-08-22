import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSaleVehicleById,
  deleteSaleVehicle,
  sellSaleVehicle,
} from '../../../actions/saleVehicle';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';

const ViewSaleVehicle = ({
  getSaleVehicleById,
  deleteSaleVehicle,
  sellSaleVehicle,
  saleVehicle: { saleVehicle, loading },
  auth,
  history,
  match: { params },
}) => {
  useEffect(() => {
    getSaleVehicleById(params.vehicle_id);
  }, [getSaleVehicleById, params.vehicle_id]);

  return (
    <Fragment>
      <SideNavbar />
      {saleVehicle === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='sidebar-container'>
            <Alerts />
            <p className='large'>
              <i className='fas fa-car'></i>Sale Vehicle Details
            </p>
            <div className='vehicle'>
              <div className='vehicle-view-images'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img src={saleVehicle.images[0]} alt='Nadeeshans' />
                      </td>
                      <td>
                        <img src={saleVehicle.images[1]} alt='Nadeeshans' />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={saleVehicle.images[3]} alt='Nadeeshans' />
                      </td>
                      <td>
                        <img src={saleVehicle.images[4]} alt='Nadeeshans' />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={saleVehicle.images[5]} alt='Nadeeshans' />
                      </td>
                      <td>
                        <img src={saleVehicle.images[6]} alt='Nadeeshans' />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='vehicle-view-details'>
                <table className='p-content'>
                  <tbody>
                    <tr>
                      <td className='table-content-header'>Make</td>
                      <td>{saleVehicle.make}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Model</td>
                      <td>{saleVehicle.model}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Condition</td>
                      <td>{saleVehicle.condition}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Manufacture Year</td>
                      <td>{saleVehicle.manufactureYear}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Gear</td>
                      <td>{saleVehicle.gear}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Color</td>
                      <td>{saleVehicle.color}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Mileage</td>
                      <td>{saleVehicle.mileage} KM</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Seating Capacity</td>
                      <td>{saleVehicle.seatingCapacity}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Engine Number</td>
                      <td>{saleVehicle.engineNo}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Chassis Number</td>
                      <td>{saleVehicle.chassisNo}</td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Notes</td>
                      <td>
                        {saleVehicle.specialNotes} {saleVehicle.vehicleRegNo}{' '}
                      </td>
                    </tr>
                    <tr>
                      <td className='table-content-header'>Price</td>
                      <td className='table-content-price'>
                        {saleVehicle.price} LKR
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  to={`sale-vehicles/edit/${saleVehicle._id}`}
                  className='btn btn-success'
                >
                  <i className='fa fa-pencil-square-o' aria-hidden='true'></i>
                  Edit
                </Link>
                <Link to={`sale-vehicles/sold/${saleVehicle._id}`}>
                  <button
                    onClick={() => sellSaleVehicle(saleVehicle._id, history)}
                    className='btn btn-search'
                  >
                    <i className='fa fa-car' aria-hidden='true'></i>
                    <i
                      className='fa fa-arrow-right'
                      aria-hidden='true'
                    ></i>{' '}
                    Sold
                  </button>
                </Link>
                <button
                  onClick={() => deleteSaleVehicle(saleVehicle._id, history)}
                  className='btn btn-danger'
                >
                  <i className='fa fa-trash-o' aria-hidden='true'></i>
                  Delete
                </button>
                <Link to='/sale-vehicles' className='btn btn-secondary'>
                  Back
                </Link>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewSaleVehicle.propTypes = {
  getSaleVehicleById: PropTypes.func.isRequired,
  deleteSaleVehicle: PropTypes.func.isRequired,
  sellSaleVehicle: PropTypes.func.isRequired,
  saleVehicle: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getSaleVehicleById,
  deleteSaleVehicle,
  sellSaleVehicle,
})(ViewSaleVehicle);
