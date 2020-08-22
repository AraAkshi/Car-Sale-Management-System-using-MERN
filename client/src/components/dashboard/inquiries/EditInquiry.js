import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateInquiry, getInquiryById } from '../../../actions/inquiry';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';
import Spinner from '../../layout/Spinner';

const EditInquiry = ({
  inquiry: { inquiry, loading },
  getInquiryById,
  updateInquiry,
  match: { params },
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    make: '',
    model: '',
    specialNotes: '',
    isAttended: '',
  });

  useEffect(() => {
    getInquiryById(params.inquiry_id);
    setFormData({
      name: loading || !inquiry.name ? '' : inquiry.name,
      contact: loading || !inquiry.contact ? '' : inquiry.contact,
      email: loading || !inquiry.email ? '' : inquiry.email,
      make: loading || !inquiry.make ? '' : inquiry.make,
      model: loading || !inquiry.model ? '' : inquiry.model,
      isAttended: loading || !inquiry.isAttended ? '' : inquiry.isAttended,
      specialNotes:
        loading || !inquiry.specialNotes ? '' : inquiry.specialNotes,
    });
  }, [loading, getInquiryById, params.inquiry_id]);

  const {
    name,
    contact,
    email,
    make,
    model,
    specialNotes,
    isAttended,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    updateInquiry(formData, params.inquiry_id, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <p className='x-large'>
                <i className='fas fa-phone-square'></i> Edit Inquiry Details
              </p>
              <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                  <select
                    className='form-dashboard'
                    name='isAttended'
                    value={isAttended}
                    onChange={e => onChange(e)}
                  >
                    <option value='false'>NOT ATTENDED</option>
                    <option value='true'>ATTENDED</option>
                  </select>
                </div>
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
                  value='UPDATE INQUIRY'
                  className='btn btn-success'
                />
                <Link to='/inquiries' className='btn btn-secondary'>
                  CANCEL
                </Link>
              </form>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

EditInquiry.propTypes = {
  getInquiryById: PropTypes.func.isRequired,
  updateInquiry: PropTypes.func.isRequired,
  inquiry: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  inquiry: state.inquiry,
});

export default connect(mapStateToProps, { getInquiryById, updateInquiry })(
  withRouter(EditInquiry)
);
