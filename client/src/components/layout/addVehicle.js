import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addVehicle } from '../../actions/vehicle';
import PropTypes from 'prop-types';
import FileBase64 from 'react-file-base64';

const AddVehicle = ({ addVehicle, history }) => {
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
    images: File,
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
    images,
    specialNotes,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  async function fileToString(e) {
    let i = 0;
    let name = e.target.name;
    let value = await toBase64(e.target.files[i]);
    setFormData({ ...formData, [name]: value });
  }

  const onSubmit = async e => {
    console.log(formData);
    e.preventDefault();
    addVehicle(formData, history);
  };

  return (
    <Fragment>
      <h1 className='text-primary large'>Sell Vehicles</h1>
      <p className='large'>
        <i className='fas fa-car'></i>Add Vehicle Details
      </p>
      <form action='' className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='condition'
            value={condition}
            onChange={e => onChange(e)}
          >
            <option value='0'>Select Vehicle Condition</option>
            <option value='unregBrandNew'>UNREGISTERED BRAND NEW</option>
            <option value='regBrandNew'>REGISTERED BRAND NEW</option>
            <option value='reconditioned'>RECONDITIONED</option>
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
            <option value='auto'>AUTO</option>
            <option value='manual'>MANUAL</option>
            <option value='tiptronic'>TIPTRONIC</option>
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
          <select name='fuelType' value={fuelType} onChange={e => onChange(e)}>
            <option value='0'>Select Fuel Type</option>
            <option value='diesel'>DIESEL</option>
            <option value='electric'>ELECTRIC</option>
            <option value='petrol'>PETROL</option>
            <option value='dieselHybrid'>DIESEL-HYBRID</option>
            <option value='petrolHybrid'>PETROL-HYBRID</option>
            <option value='pluginHybrid'>PLUGIN-HYBRID</option>
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
            type='text'
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
          <input
            type='file'
            name='images'
            multiple
            onChange={e => fileToString(e)}
          />
          <small className='form-text'>
            *Maximum No. of images that can be uploaded is 6
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
        <input type='submit' value='ADD VEHICLE' className='btn btn-primary' />
      </form>
    </Fragment>
  );
};

AddVehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired,
};

export default connect(null, { addVehicle })(withRouter(AddVehicle));
