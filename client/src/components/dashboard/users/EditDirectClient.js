import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addClientProfile } from '../../../actions/saleClientProfile';
import SideNavbar from '../SideNavbar';
import PropTypes from 'prop-types';
import Alerts from '../../layout/Alerts';

const AddDirectClient = ({ addClientProfile, history, match: { params } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    houseNo: '',
    streetName: '',
    city: '',
    contact: '',
    role: '',
    nic: '',
  });

  const {
    name,
    email,
    houseNo,
    streetName,
    city,
    contact,
    role,
    nic,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const vehicle_id = params.vehicle_id;
    addClientProfile(formData, vehicle_id, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='large'>
          <i className='fas fa-user'></i>Edit Customer Details
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              className='form-dashboard'
              placeholder='Enter Name in Full'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='nic'
              className='form-dashboard'
              placeholder='Enter NIC'
              value={nic}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              className='form-dashboard'
              placeholder='Enter Email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <h4
            className='form-text'
            style={{ textAlign: 'left', paddingLeft: '320px' }}
          >
            Address
          </h4>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter HouseNo'
              name='houseNo'
              className='form-dashboard'
              value={houseNo}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter Street Name'
              name='streetName'
              className='form-dashboard'
              value={streetName}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter City'
              name='city'
              className='form-dashboard'
              value={city}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='contact'
              placeholder='Enter Contact Number'
              minLength='10'
              className='form-dashboard'
              value={contact}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <select
              name='role'
              className='form-dashboard'
              value={role}
              onChange={e => onChange(e)}
            >
              <option value='BUYER'>BUYER</option>
              <option value='SELLER'>SELLER</option>
            </select>
          </div>

          <Link to='/sale-clients' className='btn btn-secondary'>
            BACK
          </Link>
          <input type='submit' value='CONFIRM' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

AddDirectClient.propTypes = {
  addClientProfile: PropTypes.func.isRequired,
};

export default connect(null, { addClientProfile })(AddDirectClient);
