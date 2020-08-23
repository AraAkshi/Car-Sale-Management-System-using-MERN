import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getEmployees } from '../../../actions/employee';
import Spinner from '../../layout/Spinner';

const Employee = ({ getEmployees, profile: { profiles, loading } }) => {
  useEffect(() => {
    getEmployees();
  }, [getEmployees]);
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
                    placeholder='Search all Employees'
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
                        <tr key={profile._id}>
                          <td>{profile.name}</td>
                          <td>{profile.contact}</td>
                          <td>{profile.email}</td>
                          <td>
                            <Link
                              to={`employee/${profile._id}`}
                              className='btn btn-search'
                            >
                              View
                            </Link>
                            <Link
                              to={`employee/edit/${profile._id}`}
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
              <Link to='employee/add-employee' className='btn btn-primary'>
                ADD EMPLOYEE
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Employee.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getEmployees })(Employee);
