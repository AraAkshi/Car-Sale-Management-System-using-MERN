import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Appointment from './MyAppointment';
import Offer from './MyOffer';
import Vehicle from './MyVehicle';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Profile = ({ getCurrentProfile, deleteAccount, auth: { user } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className='large text-primary'>MY Account</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      <Fragment>
        <Appointment user={user.id} />
        <Offer user={user.id} />
        <Vehicle owner={user.id} />

        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus' /> Delete My Account
          </button>
        </div>
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
);
