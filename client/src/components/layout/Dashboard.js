import React, { Fragment } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

const Dashboard = () => {
  return (
    <div className='parent'>
      <nav class='sidebar bg-secondary'>
        <img
          src='../../img/Nadeeshans Logo.png'
          alt='Nadeeshans'
          class='sidebar-image'
        />
        <ul>
          <li>
            <a href='dashboard.html'>DASHBOARD</a>
          </li>
          <li>
            <a href='inventory.html'>VEHICLES</a>
          </li>
          <li>
            <a href='inquiries.html'>INQUIRIES</a>
          </li>
          <li>
            <a href='appointments.html'>APPOINTMENTS</a>
          </li>
          <li>
            <a href='reports.html'>REPORTS</a>
          </li>
          <li>
            <a href='users.html'>USERS</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
