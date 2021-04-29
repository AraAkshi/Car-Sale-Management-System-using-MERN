import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProfileById,
  deleteAccount,
} from '../../../actions/saleClientProfile';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';

const ViewSaleUser = ({
  getProfileById,
  deleteAccount,
  profile: { profile, loading },
  match: { params },
}) => {
  useEffect(() => {
    getProfileById(params.client_id);
  }, [getProfileById, params.client_id]);

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Alerts />
            <p className='large'>
              <i className='fas fa-user'></i>Sale Customer Details
            </p>
            <div className='vehicle-view-details'>
              <table className='p-content'>
                <tbody>
                  <tr>
                    <td className='table-content-header'>Name</td>
                    <td>{profile.name}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Contact</td>
                    <td>{profile.contact}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Email</td>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Address</td>
                    <td>
                      {profile.houseNo}, {profile.streetName}, {profile.city}
                    </td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Registered Date</td>
                    <td>{profile.regDate}</td>
                  </tr>
                </tbody>
              </table>
              <Link to='/online-vehicles' className='btn btn-secondary'>
                BACK
              </Link>
              <button
                onClick={() => deleteAccount(profile._id)}
                className='btn btn-danger'
              >
                Delete
              </button>
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

ViewSaleUser.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
  ViewSaleUser
);
