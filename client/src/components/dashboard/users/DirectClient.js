import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getProfiles } from '../../../actions/saleClientProfile';
import Spinner from '../../layout/Spinner';

const DirectClient = ({ getProfiles, profile: { profiles, loading } }) => {
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
                    placeholder='Search all Sale Clients'
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
                    {profiles.length > 0 ? (
                      profiles.map(profile => (
                        <tr>
                          <td>{profile.name}</td>
                          <td>{profile.contact}</td>
                          <td>{profile.email}</td>
                          <td>
                            <Link
                              to={`sale-clients/${profile._id}`}
                              className='btn btn-search'
                            >
                              VIew
                            </Link>
                            <Link
                              to={`sale-clients/edit/${profile._id}`}
                              className='btn btn-success'
                            >
                              Edit
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

              <Link to='sale-clients/add-client' className='btn btn-primary'>
                ADD CLIENT
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

DirectClient.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(DirectClient);
