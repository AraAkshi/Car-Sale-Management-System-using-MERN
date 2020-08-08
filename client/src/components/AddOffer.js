import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addOffer } from '../actions/offer';
import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';

const AddOffer = ({ addOffer, history, match: { params } }) => {
  const [offerData, setOfferData] = useState({
    amount: '',
    contact: '',
    specialNotes: '',
  });

  const { amount, contact, specialNotes } = offerData;

  const onChange = e =>
    setOfferData({ ...offerData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const vehicle_id = params.vehicle_id;
    addOffer(offerData, vehicle_id, history);
  };

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <p className='large'>Enter Offer Details</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='amount'
              placeholder='Enter Offer Amount'
              value={amount}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='contact'
              placeholder='Contact No'
              value={contact}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              This will be used to contact you if your Offer is selected
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='specialNotes'
              placeholder='Special Notes'
              value={specialNotes}
              onChange={e => onChange(e)}
            />
          </div>
          <Link to={`/on-sale-vehicles`} className='btn btn-secondary'>
            CANCEL
          </Link>
          <input type='submit' value='ADD OFFER' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

AddOffer.propTypes = {
  addOffer: PropTypes.func.isRequired,
};

export default connect(null, { addOffer })(withRouter(AddOffer));
