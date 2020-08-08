import React, { Fragment } from 'react';
import Navbar from './Navbar';

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <section className='jumbatron'>
        <div className='dark-overlay'>
          <div className='jumbatron-text'>
            <h1 className='x-large'>WELCOME TO NADEESHANS</h1>
            <h4 className='large'>Dealers in Motor Vehicles</h4>
            <p className='p-content'>
              Leasing facilities can be arranged for Registered and Unregistered
              vehicles
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
