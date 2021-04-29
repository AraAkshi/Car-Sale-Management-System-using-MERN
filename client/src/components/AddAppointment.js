import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addAppointment } from '../actions/appointment';
import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';

const AddAppointment = ({ addAppointment, history, match: { params } }) => {
  const [appointmentData, setAppointmentData] = useState({
    scheduleDate: '',
    scheduleTime: '',
    specialNotes: '',
  });

  const { scheduleDate, scheduleTime, specialNotes } = appointmentData;

  const onChange = e =>
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const vehicle_id = params.vehicle_id;
    addAppointment(appointmentData, vehicle_id, history);
  };

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <p className='large'>Appointment Details</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <label>Choose an Appointment Date</label>
            <input
              type='date'
              name='scheduleDate'
              min={new Date().toISOString().split('T')[0]}
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
              placeholder='Appointment Time'
              value={scheduleTime}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              *Please select a time between 8.00 a.m to 6.00 p.m
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='specialNotes'
              placeholder='Mention any Special Notes if any'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <Link to={`/on-sale-vehicles`} className='btn btn-secondary'>
            CANCEL
          </Link>
          <input type='submit' value='CONFIRM' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

AddAppointment.propTypes = {
  addAppointment: PropTypes.func.isRequired,
};

export default connect(null, { addAppointment })(withRouter(AddAppointment));
