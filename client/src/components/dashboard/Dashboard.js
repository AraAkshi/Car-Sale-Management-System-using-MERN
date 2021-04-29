import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Alerts from '../layout/Alerts';

const Dashboard = props => {
  return (
    <Fragment>
      <SideNavbar />
      <section
        className='sidebar-container'
        style={{ backgroundColor: 'rgb(34, 34, 34)' }}
      >
        <Alerts />
        <div className='dashboard-header'>
          <h1 className='large'>Welcome to Nadeeshans</h1>
        </div>
        <div className='dashboard-notification'>
          <div className='dashboard-notification-widget'>
            <Link to='/appointments'>APPOINTMENTS</Link>
          </div>
          <div className='dashboard-notification-widget'>
            <Link to='/inquiries'>INQUIRIES</Link>
          </div>
          <div className='dashboard-notification-widget'>
            <Link to='/offers'>OFFERS</Link>
          </div>
          <div className='dashboard-notification-widget'>
            <Link to='/renewals'>RENEWALS</Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
