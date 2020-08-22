import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addSaleAppointment } from '../../../actions/appointment';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';

const AddAppointment = ({ addSaleAppointment, history }) => {
  const [appointmentData, setAppointmentData] = useState({
    scheduleDate: '',
    scheduleTime: '',
    specialNotes: '',
    name: '',
    contact: '',
  });

  const {
    scheduleDate,
    scheduleTime,
    specialNotes,
    name,
    contact,
  } = appointmentData;

  const onChange = e =>
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addSaleAppointment(appointmentData, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='large'>Add Appointment Details</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              className='form-dashboard'
              value={name}
              onChange={e => onChange(e)}
              placeholder='Enter Customer Name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-dashboard'
              name='contact'
              value={contact}
              placeholder='Enter Customer Contact Number'
              onChange={e => onChange(e)}
              required
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
              placeholder='Appointment Time'
              className='form-dashboard'
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
          <input type='submit' value='CONFIRM' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

AddAppointment.propTypes = {
  addSaleAppointment: PropTypes.func.isRequired,
};

export default connect(null, { addSaleAppointment })(
  withRouter(AddAppointment)
);
