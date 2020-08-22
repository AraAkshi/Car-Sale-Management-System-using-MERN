import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addVehicle } from '../../actions/clientVehicle';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const AddVehicle = ({ addVehicle, history }) => {
  const [files, setFiles] = useState(null);
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
    price: '',
    specialNotes: '',
  });

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
    data.append('price', price);
    data.append('specialNotes', specialNotes);

    addVehicle(data, history);
  };

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <h1 className='text-primary large'>Sell Vehicles</h1>
        <p className='large'>
          <i className='fas fa-car'></i>Add Vehicle Details
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
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
              <option value='REGISTERED BRAND NEW'>REGISTERED BRAND NEW</option>
              <option value='RECONDITIONED'>RECONDITIONED</option>
            </select>
          </div>
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
          <div className='form-group'>
            <input
              type='text'
              name='chassisNo'
              placeholder='Chassis Number'
              value={chassisNo}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='engineNo'
              placeholder='Engine Number'
              value={engineNo}
              onChange={e => onChange(e)}
            />
          </div>
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
          <div className='form-group'>
            <select name='gear' value={gear} onChange={e => onChange(e)}>
              <option value='0'>Select Transmission Gear</option>
              <option value='AUTO'>AUTO</option>
              <option value='MANUAL'>MANUAL</option>
              <option value='TIPTRONIC'>TIPTRONIC</option>
            </select>
          </div>
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
          <div className='form-group'>
            <input
              type='text'
              name='originCountry'
              placeholder='Country of Origin'
              value={originCountry}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label>Manufactured Year</label>
            <input
              type='date'
              name='manufactureYear'
              value={manufactureYear}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              name='seatingCapacity'
              placeholder='Seating Capacity'
              value={seatingCapacity}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='cylinderCapacity'
              placeholder='Cylinder Capacity in CC'
              value={cylinderCapacity}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label>Add Vehicle Images</label>
            <input type='file' multiple onChange={onFileChange} />
            <small className='form-text'>
              *Maximum number of images can be added is 6
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='specialNotes'
              placeholder='Special Notes'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='price'
              placeholder='Selling Price in LKR'
              value={price}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='reset' value='RESET' className='btn btn-secondary' />
          <input
            type='submit'
            value='ADD VEHICLE'
            className='btn btn-primary'
          />
        </form>
      </section>
    </Fragment>
  );
};

AddVehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired,
};

export default connect(null, { addVehicle })(withRouter(AddVehicle));
