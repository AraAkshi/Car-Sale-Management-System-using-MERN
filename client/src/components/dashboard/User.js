import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';

const User = props => {
  return (
    <Fragment>
      <SideNavbar />
      <section class='sidebar-container'>
        <Alerts />
        Users
      </section>
    </Fragment>
  );
};

export default User;
