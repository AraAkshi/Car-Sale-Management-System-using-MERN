import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { staffLogin } from '../../actions/staffAuth';
import PropTypes from 'prop-types';
import Alerts from '../layout/Alerts';
import SideNavbar from '../dashboard/SideNavbar';

const StaffLogin = ({ staffLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    staffLogin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <h1 className='text-primary large'>LOGIN</h1>
        <p className='large'>
          <i className='fas fa-user'></i>Sign into Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='form-dashboard'
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-dashboard'
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={e => onChange(e)}
              required
              minLength='6'
            />
          </div>
          <input type='button' value='CANCEL' className='btn btn-secondary' />
          <input type='submit' value='LOGIN' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

StaffLogin.propTypes = {
  staffLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { staffLogin })(StaffLogin);
