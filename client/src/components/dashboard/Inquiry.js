import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';

const Inquiry = props => {
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        Inquiry
      </section>
    </Fragment>
  );
};

export default Inquiry;
