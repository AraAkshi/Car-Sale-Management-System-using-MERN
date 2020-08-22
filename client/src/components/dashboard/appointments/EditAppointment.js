import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  updateAppointment,
  getAppointmentById,
} from '../../../actions/appointment';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';

const EditAppointment = ({
  appointment: { appointment, loading },
  updateAppointment,
  getAppointmentById,
  match: { params },
  history,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    scheduleDate: '',
    scheduleTime: '',
    specialNotes: '',
    name: '',
    contact: '',
    isAttended: '',
  });

  useEffect(() => {
    getAppointmentById(params.appointment_id);
    setAppointmentData({
      name: loading || !appointment.name ? '' : appointment.name,
      contact: loading || !appointment.contact ? '' : appointment.contact,
      scheduleDate:
        loading || !appointment.scheduleDate ? '' : appointment.scheduleDate,
      scheduleTime:
        loading || !appointment.scheduleTime ? '' : appointment.scheduleTime,
      specialNotes:
        loading || !appointment.specialNotes ? '' : appointment.specialNotes,
      isAttended:
        loading || !appointment.isAttended ? '' : appointment.isAttended,
    });
  }, [loading, getAppointmentById, params.appointment_id]);

  const {
    scheduleDate,
    scheduleTime,
    specialNotes,
    name,
    contact,
    isAttended,
  } = appointmentData;

  const onChange = e =>
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    updateAppointment(appointmentData, params.appointment_id, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='large'>Edit Appointment Details</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <select
              className='form-dashboard'
              name='isAttended'
              value={isAttended}
              onChange={e => onChange(e)}
            >
              <option value='false'>NOT ATTENDED</option>
              <option value='true'>ATTENDED</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-dashboard'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              placeholder='Enter Customer Name'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='contact'
              className='form-dashboard'
              value={contact}
              placeholder='Enter Customer Contact Number'
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label>Choose an Appointment Date</label>
            <input
              type='date'
              name='scheduleDate'
              className='form-dashboard'
              value={scheduleDate}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Choose an Appointment Time</label>
            <input
              type='time'
              name='scheduleTime'
              className='form-dashboard'
              placeholder='Appointment Time'
              value={scheduleTime}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='specialNotes'
              className='form-dashboard'
              placeholder='Mention any Special Notes if any'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <Link to={`/appointments`} className='btn btn-secondary'>
            CANCEL
          </Link>
          <input
            type='submit'
            value='UPDATE APPOINTMENT'
            className='btn btn-success'
          />
        </form>
      </section>
    </Fragment>
  );
};

EditAppointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  getAppointmentById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, {
  updateAppointment,
  getAppointmentById,
})(withRouter(EditAppointment));
