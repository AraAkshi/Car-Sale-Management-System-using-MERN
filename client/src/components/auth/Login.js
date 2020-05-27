import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    console.log('SUCCESS');
  };

  return (
    <Fragment>
      <h1 className='text-primary large'>LOGIN</h1>
      <p className='large'>
        <i className='fas fa-user'></i>Sign into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
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
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
            required
            minLength='6'
          />
        </div>
        <input type='button' value='CANCEL' class='btn btn-secondary' />
        <input type='submit' value='LOGIN' class='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an Account? <Link to='/register'> Sign Up </Link>
      </p>
    </Fragment>
  );
};

export default Login;
