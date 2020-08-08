import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/clientAuth';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profile'>
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
        <Link to='/login'>LOGIN</Link>
      </li>
      <li>
        <Link to='/register'>SIGN UP</Link>
      </li>
    </ul>
  );

  return (
    <div className='parent'>
      <nav className='navbar bg-primary'>
        <h1>
          <Link to='/'>NADEESHANS</Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
      <nav className='menubar bg-secondary'>
        <ul>
          <li>
            <Link to='/'>HOME</Link>
          </li>
          <li>
            <Link to='/on-sale-vehicles'>ON SALE VEHICLES</Link>
          </li>
          <li>
            <Link to='/sell-vehicle'>SELL VEHICLES</Link>
          </li>
          <li>
            <Link to='/contact-us'>CONTACT US</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
