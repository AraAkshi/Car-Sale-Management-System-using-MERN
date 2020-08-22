import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateSaleVehicle,
  getSaleVehicleById,
} from '../../../actions/saleVehicle';
import PropTypes from 'prop-types';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';

const EditSaleVehicle = ({
  saleVehicle: { saleVehicle, loading },
  updateSaleVehicle,
  getSaleVehicleById,
  auth,
  match: { params },
  history,
}) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    vehicleRegNo: '',
    model: '',
    make: '',
    condition: '',
    chassisNo: '',
    engineNo: '',
    color: '',
    gear: '',
    mileage: '',
    fuelType: '',
    originCountry: '',
    manufactureYear: '',
    seatingCapacity: '',
    cylinderCapacity: '',
    registeredDate: '',
    lastServiceDate: '',
    noOfServicesDone: '',
    insuranceType: '',
    insuranceCompany: '',
    insuranceDate: '',
    price: '',
    specialNotes: '',
  });

  useEffect(() => {
    getSaleVehicleById(params.vehicle_id);
    setFormData({
      vehicleRegNo:
        loading || !saleVehicle.vehicleRegNo ? '' : saleVehicle.vehicleRegNo,
      model: loading || !saleVehicle.model ? '' : saleVehicle.model,
      make: loading || !saleVehicle.make ? '' : saleVehicle.make,
      condition: loading || !saleVehicle.condition ? '' : saleVehicle.condition,
      chassisNo: loading || !saleVehicle.chassisNo ? '' : saleVehicle.chassisNo,
      engineNo: loading || !saleVehicle.engineNo ? '' : saleVehicle.engineNo,
      color: loading || !saleVehicle.color ? '' : saleVehicle.color,
      gear: loading || !saleVehicle.gear ? '' : saleVehicle.gear,
      mileage: loading || !saleVehicle.mileage ? '' : saleVehicle.mileage,
      fuelType: loading || !saleVehicle.fuelType ? '' : saleVehicle.fuelType,
      originCountry:
        loading || !saleVehicle.originCountry ? '' : saleVehicle.originCountry,
      manufactureYear:
        loading || !saleVehicle.manufactureYear
          ? ''
          : saleVehicle.manufactureYear,
      seatingCapacity:
        loading || !saleVehicle.seatingCapacity
          ? ''
          : saleVehicle.seatingCapacity,
      cylinderCapacity:
        loading || !saleVehicle.cylinderCapacity
          ? ''
          : saleVehicle.cylinderCapacity,
      registeredDate:
        loading || !saleVehicle.registeredDate
          ? ''
          : saleVehicle.registeredDate,
      lastServiceDate:
        loading || !saleVehicle.lastServiceDate
          ? ''
          : saleVehicle.lastServiceDate,
      noOfServicesDone:
        loading || !saleVehicle.noOfServicesDone
          ? ''
          : saleVehicle.noOfServicesDone,
      insuranceType:
        loading || !saleVehicle.insuranceType ? '' : saleVehicle.insuranceType,
      insuranceCompany:
        loading || !saleVehicle.insuranceCompany
          ? ''
          : saleVehicle.insuranceCompany,
      insuranceDate:
        loading || !saleVehicle.insuranceDate ? '' : saleVehicle.insuranceDate,
      price: loading || !saleVehicle.price ? '' : saleVehicle.price,
      specialNotes:
        loading || !saleVehicle.specialNotes ? '' : saleVehicle.specialNotes,
    });
  }, [loading, getSaleVehicleById, params.vehicle_id]);

  const {
    vehicleRegNo,
    model,
    make,
    condition,
    chassisNo,
    engineNo,
    color,
    gear,
    mileage,
    fuelType,
    originCountry,
    manufactureYear,
    seatingCapacity,
    cylinderCapacity,
    registeredDate,
    lastServiceDate,
    noOfServicesDone,
    insuranceType,
    insuranceCompany,
    insuranceDate,
    price,
    specialNotes,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    setFiles(e.target.files);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    //loop through the selected files
    for (let x; x < files.length; x++) {
      data.append('images', files[x]);
    }
    data.append('vehicleRegNo', vehicleRegNo);
    data.append('model', model);
    data.append('make', make);
    data.append('condition', condition);
    data.append('chassisNo', chassisNo);
    data.append('engineNo', engineNo);
    data.append('color', color);
    data.append('gear', gear);
    data.append('mileage', mileage);
    data.append('fuelType', fuelType);
    data.append('originCountry', originCountry);
    data.append('manufactureYear', manufactureYear);
    data.append('seatingCapacity', seatingCapacity);
    data.append('cylinderCapacity', cylinderCapacity);
    data.append('registeredDate', registeredDate);
    data.append('lastServiceDate', lastServiceDate);
    data.append('noOfServicesDone', noOfServicesDone);
    data.append('insuranceType', insuranceType);
    data.append('insuranceCompany', insuranceCompany);
    data.append('insuranceDate', insuranceDate);
    data.append('price', price);
    data.append('specialNotes', specialNotes);

    updateSaleVehicle(data, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='large'>
          <i className='fas fa-car'></i>Edit Vehicle Details
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-table'>
            <table>
              <tbody>
                <tr>
                  <td>Condition:</td>
                  <td>
                    <div className='form-group'>
                      <select
                        name='condition'
                        value={condition}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Vehicle Condition</option>
                        <option value='UNREGISTERED BRAND NEW'>
                          UNREGISTERED BRAND NEW
                        </option>
                        <option value='REGISTERED BRAND NEW'>
                          REGISTERED BRAND NEW
                        </option>
                        <option value='RECONDITIONED'>RECONDITIONED</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Registration No:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Vehicle Registration Number'
                        name='vehicleRegNo'
                        value={vehicleRegNo}
                        onChange={e => onChange(e)}
                      />
                      <small className='form-text'>
                        *Only fill for Registered Vehicles
                      </small>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Make:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='make'
                        placeholder='Vehicle Make'
                        value={make}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='model'
                        placeholder='Vehicle Model'
                        value={model}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Chassis No:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='chassisNo'
                        placeholder='Chassis Number'
                        value={chassisNo}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Engine No:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='engineNo'
                        placeholder='Engine Number'
                        value={engineNo}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Color:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='color'
                        placeholder='Vehicle Body Color'
                        value={color}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Gear:</td>
                  <td>
                    <div className='form-group'>
                      <select
                        name='gear'
                        value={gear}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Transmission Gear</option>
                        <option value='AUTO'>AUTO</option>
                        <option value='MANUAL'>MANUAL</option>
                        <option value='TIPTRONIC'>TIPTRONIC</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Mileage:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='mileage'
                        placeholder='Mileage in KM'
                        value={mileage}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fuel Type:</td>
                  <td>
                    <div className='form-group'>
                      <select
                        name='fuelType'
                        value={fuelType}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Fuel Type</option>
                        <option value='DIESEL'>DIESEL</option>
                        <option value='ELECTRIC'>ELECTRIC</option>
                        <option value='PETROL'>PETROL</option>
                        <option value='DIESEL-HYBRID'>DIESEL-HYBRID</option>
                        <option value='PETROL-HYBRID'>PETROL-HYBRID</option>
                        <option value='PLUGIN-HYBRID'>PLUGIN-HYBRID</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Origin Country:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='originCountry'
                        placeholder='Country of Origin'
                        value={originCountry}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Manufactured Year:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='manufactureYear'
                        value={manufactureYear}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Seating Capacity:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='number'
                        name='seatingCapacity'
                        placeholder='Seating Capacity'
                        value={seatingCapacity}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Cylinder Capacity:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='cylinderCapacity'
                        placeholder='Cylinder Capacity in CC'
                        value={cylinderCapacity}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Registered Date:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='registeredDate'
                        placeholder='Vehicle Registered Date'
                        value={registeredDate}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Last Service Date:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='lastServiceDate'
                        placeholder='Last Service Date'
                        value={lastServiceDate}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>No. of Services Done:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='number'
                        name='noOfServicesDone'
                        placeholder='Number of Services Done'
                        value={noOfServicesDone}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Insurance Type:</td>
                  <td>
                    <div className='form-group'>
                      <select
                        name='insuranceType'
                        value={insuranceType}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Insurance Type</option>
                        <option value='THIRD PARTY COVERAGE'>
                          THIRD PARTY COVERAGE
                        </option>
                        <option value='FULL BODY COVERAGE'>
                          FULL BODY COVERAGE
                        </option>
                        <option value='NOT INSURED'>NOT INSURED</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Insurance Company:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='insuranceCompany'
                        placeholder='Insurance Company Name'
                        value={insuranceCompany}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Insurance Date:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='insuranceDate'
                        placeholder='Insurance Date'
                        value={insuranceDate}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Add Vehicle Images</td>
                  <td>
                    <div className='form-group'>
                      <input type='file' multiple onChange={onFileChange} />
                      <small className='form-text'>
                        *Maximum number of images can be added is 6
                      </small>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Special Notes:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='specialNotes'
                        placeholder='Special Notes'
                        value={specialNotes}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='text'
                        name='price'
                        placeholder='Selling Price in LKR'
                        value={price}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to='/sale-vehicles' className='btn btn-secondary'>
            BACK
          </Link>
          <input type='submit' value='CONFIRM' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

EditSaleVehicle.propTypes = {
  updateSaleVehicle: PropTypes.func.isRequired,
  getSaleVehicleById: PropTypes.func.isRequired,
  saleVehicle: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateSaleVehicle,
  getSaleVehicleById,
})(withRouter(EditSaleVehicle));
