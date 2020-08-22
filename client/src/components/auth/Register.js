import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import { register } from '../../actions/clientAuth';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import Alerts from '../layout/Alerts';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    houseNo: '',
    streetName: '',
    city: '',
    contact: '',
    password: '',
    password2: '',
  });

  const {
    name,
    email,
    houseNo,
    streetName,
    city,
    contact,
    password,
    password2,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, houseNo, streetName, city, contact, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <h1 className='text-primary large'>SIGN UP</h1>
        <p className='large'>
          <i className='fas fa-user'></i>Create Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              *Please enter your First Name and Last Name
            </small>
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <h4 className='form-text'>Address</h4>
          <div className='form-group'>
            <input
              type='text'
              placeholder='HouseNo'
              name='houseNo'
              value={houseNo}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='StreetName'
              name='streetName'
              value={streetName}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='contact'
              placeholder='Contact Number'
              minLength='10'
              value={contact}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              *Please enter a password of minimum length of 6 characters
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type='reset' value='RESET' className='btn btn-secondary' />
          <input type='submit' value='CONFIRM' className='btn btn-primary' />
        </form>
        <p className='my-1'>
          Already have an Account? <Link to='/login'> Sign In </Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
