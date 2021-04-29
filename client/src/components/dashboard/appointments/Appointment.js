import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import {
  getAppointments,
  deleteAppointment,
} from '../../../actions/appointment';
import Spinner from '../../layout/Spinner';

const Appointment = ({
  getAppointments,
  deleteAppointment,
  appointment: { appointments, loading },
  history,
}) => {
  useEffect(() => {
    getAppointments();
  }, [getAppointments]);
  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <p className='large'>
                <i className='fas fa-phone-square'></i> All Appointments
              </p>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      <th>VEHICLE</th>
                      <th>DATE</th>
                      <th>TIME</th>
                      <th>NOTES</th>
                      <th>ATTENDED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map(appointment => (
                        <tr key={appointment._id}>
                          <td>
                            {appointment.customer.name
                              ? appointment.customer.name
                              : appointment.name}
                          </td>
                          <td>
                            {appointment.customer.contact
                              ? appointment.customer.contact
                              : appointment.contact}
                          </td>
                          <td>
                            {appointment.vehicle.make}{' '}
                            {appointment.vehicle.model}
                          </td>
                          <td>{appointment.scheduleDate}</td>
                          <td>{appointment.scheduleTime}</td>
                          <td>{appointment.specialNotes}</td>
                          {appointment.isAttended ? (
                            <td
                              style={{
                                backgroundColor: 'green',
                                color: 'white',
                              }}
                            >
                              <i className='fa fa-check' aria-hidden='true'></i>{' '}
                              Yes
                            </td>
                          ) : (
                            <td
                              style={{
                                backgroundColor: 'red',
                                color: 'white',
                              }}
                            >
                              <i className='fa fa-times' aria-hidden='true'></i>{' '}
                              No
                            </td>
                          )}
                          <td>
                            <Link
                              to={`appointments/edit/${appointment._id}`}
                              className='btn btn-success'
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                deleteAppointment(appointment._id, history)
                              }
                              className='btn btn-danger'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='5'> No appointments found </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Link
                to='appointments/add-appointment'
                className='btn btn-primary'
              >
                ADD APPOINTMENT
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Appointment.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  deleteAppointment: PropTypes.func.isRequired,
  appointment: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointments, deleteAppointment })(
  Appointment
);
