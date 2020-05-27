import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='parent'>
      <nav className='navbar bg-primary'>
        <h1>
          <Link to='/'>NADEESHANS</Link>
        </h1>
        <ul>
          <li>
            <Link to='/login'>LOGIN</Link>
          </li>
          <li>
            <Link to='/register'>SIGN UP</Link>
          </li>
        </ul>
      </nav>
      <nav className='menubar bg-secondary'>
        <ul>
          <li>
            <Link to='/'>HOME</Link>
          </li>
          <li>
            <Link to='/saleVehicles'>ON SALE VEHICLES</Link>
          </li>
          <li>
            <Link to='/sellVehicle'>SELL VEHICLES</Link>
          </li>
          <li>
            <Link to='/about'>ABOUT</Link>
          </li>
          <li>
            <Link to='/contactUs'>CONTACT US</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
