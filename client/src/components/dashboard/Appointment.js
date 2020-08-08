import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';

const Appointment = props => {
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        Appointments
      </section>
    </Fragment>
  );
};

export default Appointment;
