import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVehicleById } from '../../../actions/clientVehicle';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import image from '../../../img/07.jpg';

const ViewOnlineVehicle = ({
  getVehicleById,
  clientVehicle: { clientVehicle, loading },
  auth,
  match: { params },
}) => {
  useEffect(() => {
    getVehicleById(params.vehicle_id);
  }, [getVehicleById, params.vehicle_id]);

  return (
    <Fragment>
      <SideNavbar />
      {clientVehicle === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="sidebar-container">
            <Alerts />
            <p className="large">
              <i className="fas fa-car"></i>Online Vehicle Details
            </p>
            <div className="vehicle">
              <div className="vehicle-view-images">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img src={image} alt="Nadeeshans" />
                      </td>
                      <td>
                        <img src={clientVehicle.images[1]} alt="Nadeeshans" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={clientVehicle.images[3]} alt="Nadeeshans" />
                      </td>
                      <td>
                        <img src={clientVehicle.images[4]} alt="Nadeeshans" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={clientVehicle.images[5]} alt="Nadeeshans" />
                      </td>
                      <td>
                        <img src={clientVehicle.images[6]} alt="Nadeeshans" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="vehicle-view-details">
                <table className="p-content">
                  <tbody>
                    <tr>
                      <td className="table-content-header">Make</td>
                      <td>{clientVehicle.make}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Model</td>
                      <td>{clientVehicle.model}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Condition</td>
                      <td>{clientVehicle.condition}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Manufacture Year</td>
                      <td>{clientVehicle.manufactureYear}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Gear</td>
                      <td>{clientVehicle.gear}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Color</td>
                      <td>{clientVehicle.color}</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Mileage</td>
                      <td>{clientVehicle.mileage} KM</td>
                    </tr>
                    <tr>
                      <td className="table-content-header">Notes</td>
                      <td>
                        {clientVehicle.specialNotes}{' '}
                        {clientVehicle.seatingCapacity}{' '}
                        {clientVehicle.vehicleRegNo}{' '}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="table-content-price">
                        {clientVehicle.price} LKR
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link to="" className="btn btn-danger">
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                  Delete
                </Link>
                <Link to="/online-vehicles" className="btn btn-secondary">
                  BACK
                </Link>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewOnlineVehicle.propTypes = {
  getVehicleById: PropTypes.func.isRequired,
  clientVehicle: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clientVehicle: state.clientVehicle,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVehicleById })(ViewOnlineVehicle);
