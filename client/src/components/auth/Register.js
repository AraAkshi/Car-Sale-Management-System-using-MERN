import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    email: '',
    address: '',
    contact: '',
    password: '',
    password2: '',
  });

  const { name, nic, email, address, contact, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      console.log('pw not match');
    } else {
      console.log('SUCCESS');
      // const newUser = {
      //   name,
      //   nic,
      //   email,
      //   address,
      //   contact,
      //   password,
      // };
      // console.log(newUser);
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   };

      //   const body = JSON.stringify(newUser);
      //   const res = await axios.post('/api/customers', body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };

  return (
    <Fragment>
      <h1 className='text-primary large'>SIGN UP</h1>
      <p className='large'>
        <i className='fas fa-user'></i>Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            Please enter your First Name and Last Name
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='nic'
            placeholder='NIC Number'
            value={nic}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='contact'
            placeholder='Contact Number'
            minLength='10'
            value={contact}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
            required
            minLength='6'
          />
          <small className='form-text'>
            Please enter a password of minimum length of 6 characters including
            at least one uppercase character and a number
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password2'
            placeholder='Confirm Password'
            value={password2}
            onChange={e => onChange(e)}
            required
            minLength='6'
          />
        </div>
        <input type='reset' value='RESET' className='btn btn-secondary' />
        <input type='submit' value='CONFIRM' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an Account? <Link to='/login'> Sign In </Link>
      </p>
    </Fragment>
  );
};

export default Register;
