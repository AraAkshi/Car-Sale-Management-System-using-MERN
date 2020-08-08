import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';

const Report = props => {
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        Reports
      </section>
    </Fragment>
  );
};

export default Report;
