import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { staffLogin } from '../../actions/staffAuth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alerts from '../layout/Alerts';

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
      <div className='login-container'>
        <nav className='navbar-login bg-secondary'>
          <h1>
            <Link to='#' className='href'>
              {' '}
              NADEESHANS{' '}
            </Link>
          </h1>
          <Fragment>
            <Link to='/login-staff'>LOGIN</Link>
          </Fragment>
        </nav>
        <section className='main-container login-jumbatron'>
          <Alerts />
          <h1 className='large'>WELCOME TO NADEESHANS</h1>
          <h1 className='headers'>Dealers in Motor Vehicles</h1>
          <p className='large'>
            <i className='fas fa-user'></i> LOGIN
          </p>
          <form className='login-form' onSubmit={e => onSubmit(e)}>
            <div>
              <input
                className='form-login'
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div>
              <input
                className='form-login'
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
      </div>
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
