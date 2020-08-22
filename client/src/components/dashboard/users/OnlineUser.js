import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getProfiles } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
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
              <form className='form-allVehicles'>
                <div className='searchBar'>
                  <input
                    type='text'
                    name='allVehicles'
                    id='allVehicles'
                    placeholder='Search all Vehicles'
                  />
                  <input
                    type='button'
                    className='btn btn-search'
                    value='Search'
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

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profile);
