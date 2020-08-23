import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import { getInquiries, deleteInquiry } from '../../../actions/inquiry';
import Spinner from '../../layout/Spinner';

const Inquiry = ({
  getInquiries,
  deleteInquiry,
  inquiry: { inquiries, loading },
  history,
}) => {
  useEffect(() => {
    getInquiries();
  }, [getInquiries]);

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
              <p className='large'>
                <i className='fas fa-phone-square'></i> All Inquiries
              </p>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      <th>MAKE - MODEL</th>
                      <th>NOTES</th>
                      <th>ATTENDED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length > 0 ? (
                      inquiries.map(inquiry => (
                        <tr key={inquiry._id}>
                          <td>{inquiry.name}</td>
                          <td>{inquiry.contact}</td>
                          <td>
                            {inquiry.make} {inquiry.model}
                          </td>
                          <td>{inquiry.specialNotes}</td>
                          {inquiry.isAttended ? (
                            <td
                              style={{
                                backgroundColor: 'green',
                                color: 'white',
                              }}
                            >
                              <i className='fa fa-check' aria-hidden='true'></i>{' '}
                              Yes
                            </td>
                          ) : (
                            <td
                              style={{
                                backgroundColor: 'red',
                                color: 'white',
                              }}
                            >
                              <i className='fa fa-times' aria-hidden='true'></i>{' '}
                              No
                            </td>
                          )}
                          <td>
                            <Link
                              to={`inquiries/edit/${inquiry._id}`}
                              className='btn btn-success'
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                deleteInquiry(inquiry._id, history)
                              }
                              className='btn btn-danger'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='5'> No inquiries found </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Link to='inquiries/add-inquiry' className='btn btn-primary'>
                ADD INQUIRY
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Inquiry.propTypes = {
  getInquiries: PropTypes.func.isRequired,
  deleteInquiry: PropTypes.func.isRequired,
  inquiry: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  inquiry: state.inquiry,
});

export default connect(mapStateToProps, { getInquiries, deleteInquiry })(
  Inquiry
);
