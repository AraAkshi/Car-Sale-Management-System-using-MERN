import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getProfiles } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';

const OnlineUser = ({
  getProfiles,
  clientProfile: { clientProfiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <form className='form'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-dashboard'
                    placeholder='Search all Online users'
                  />
                </div>
              </form>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      <th>EMAIL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientProfiles.length > 0 ? (
                      clientProfiles.map(clientProfile => (
                        <tr key={clientProfile._id}>
                          <td>{clientProfile.name}</td>
                          <td>{clientProfile.contact}</td>
                          <td>{clientProfile.email}</td>
                          <td>
                            <Link
                              to={`online-clients/${clientProfile._id}`}
                              className='btn btn-search'
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='5'> No profiles found </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

OnlineUser.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  clientProfile: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  clientProfile: state.clientProfile,
});

export default connect(mapStateToProps, { getProfiles })(OnlineUser);
