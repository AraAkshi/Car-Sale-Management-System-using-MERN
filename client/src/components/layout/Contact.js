import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addInquiry } from '../../actions/inquiry';
import Navbar from './Navbar';
import Alerts from './Alerts';

const Contact = ({ addInquiry, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    make: '',
    model: '',
    specialNotes: '',
  });

  const { name, contact, email, make, model, specialNotes } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addInquiry(formData, history);
  };

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <p className='x-large'>
          <i className='fas fa-phone-square'></i> Contact Us
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <p className='large'>
            <i className='fas fa-user'></i>
            Customer Details
          </p>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              *Include your First name and Last name
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your contact no'
              name='contact'
              value={contact}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              *This will be used to contact you
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <p className='large'>
            <i className='fas fa-car'></i>
            Vehicle Details
          </p>
          <small className='form-text'>
            Enter details of the Vehicle you want to know
          </small>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Vehicle make'
              name='make'
              value={make}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Vehicle model'
              name='model'
              value={model}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Other details if any'
              name='specialNotes'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='reset' value='CANCEL' className='btn btn-secondary' />
          <input
            type='submit'
            value='ADD INQUIRY'
            className='btn btn-primary'
          />
        </form>
      </section>
    </Fragment>
  );
};

Contact.propTypes = {
  addInquiry: PropTypes.func.isRequired,
};

export default connect(null, { addInquiry })(withRouter(Contact));
