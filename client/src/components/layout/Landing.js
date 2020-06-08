import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='parent'>
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
      <section className='searchBar'>
        <form>
          <input
            className='p-content'
            list='allVehicles'
            type='text'
            placeholder='Search On Sale Vehicles'
          />
          <button className='btn btn-primary'>Search</button>
        </form>
      </section>
    </div>
  );
};

export default Landing;
