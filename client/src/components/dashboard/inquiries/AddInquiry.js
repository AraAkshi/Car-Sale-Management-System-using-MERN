import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addInquiry } from '../../../actions/inquiry';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';

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
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='x-large'>
          <i className='fas fa-phone-square'></i> Add Inquiry
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <p className='large'>
            <i className='fas fa-user'></i>
            Customer Details
          </p>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter customer name'
              className='form-dashboard'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter customer contact no'
              className='form-dashboard'
              name='contact'
              value={contact}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter customer email'
              className='form-dashboard'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <p className='large'>
            <i className='fas fa-car'></i>
            Inquiring Vehicle Details
          </p>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Vehicle make'
              name='make'
              className='form-dashboard'
              value={make}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Vehicle model'
              name='model'
              className='form-dashboard'
              value={model}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Other details if any'
              name='specialNotes'
              className='form-dashboard'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <input
            type='submit'
            value='ADD INQUIRY'
            className='btn btn-primary'
          />
          <Link to='/inquiries' className='btn btn-secondary'>
            CANCEL
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

Contact.propTypes = {
  addInquiry: PropTypes.func.isRequired,
};

export default connect(null, { addInquiry })(withRouter(Contact));
