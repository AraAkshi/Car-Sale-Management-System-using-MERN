import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../img/logo.png';
import { logout } from '../../actions/staffAuth';

const SideNavbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profile/me'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>{user && user.name}</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          {' '}
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>LOGOUT</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login-staff'>LOGIN</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='navbar bg-primary'>
        <h1>
          <Link to='/' className='href'>
            {' '}
            NADEESHANS{' '}
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      <nav className='sidebar bg-secondary'>
        <img src={logo} alt='Nadeeshans' className='sidebar-image' />
        <ul>
          <li>
            <Link to='/dashboard'>DASHBOARD</Link>
          </li>
          <li>
            <Link to='/inventory'>VEHICLES</Link>
          </li>
          <li>
            <Link to='/inquiries'>INQUIRIES</Link>
          </li>
          <li>
            <Link to='/appointments'>APPOINTMENTS</Link>
          </li>
          <li>
            <Link to='/reports'>REPORTS</Link>
          </li>
          <li>
            <Link to='/users'>USERS</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

SideNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SideNavbar);
