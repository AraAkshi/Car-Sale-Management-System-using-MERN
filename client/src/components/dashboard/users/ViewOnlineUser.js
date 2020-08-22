import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';

const ViewOnlineUser = ({
  getProfileById,
  clientProfile: { clientProfile, loading },
  match: { params },
}) => {
  useEffect(() => {
    getProfileById(params.client_id);
  }, [getProfileById, params.client_id]);

  return (
    <Fragment>
      <SideNavbar />
      {clientProfile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='sidebar-container'>
            <Alerts />
            <p className='large'>
              <i className='fas fa-user'></i>Online Customer Details
            </p>
            <div className='vehicle-view-details'>
              <table className='p-content'>
                <tbody>
                  <tr>
                    <td className='table-content-header'>Name</td>
                    <td>{clientProfile.name}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Contact</td>
                    <td>{clientProfile.contact}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Email</td>
                    <td>{clientProfile.email}</td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Address</td>
                    <td>
                      {clientProfile.houseNo}, {clientProfile.streetName},{' '}
                      {clientProfile.city}
                    </td>
                  </tr>
                  <tr>
                    <td className='table-content-header'>Registered Date</td>
                    <td>{clientProfile.regDate}</td>
                  </tr>
                </tbody>
              </table>
              <Link to='/online-vehicles' className='btn btn-secondary'>
                BACK
              </Link>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewOnlineUser.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  clientProfile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  clientProfile: state.clientProfile,
});

export default connect(mapStateToProps, { getProfileById })(ViewOnlineUser);
