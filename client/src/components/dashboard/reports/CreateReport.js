import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addReport } from '../../../actions/report';
import Alerts from '../../layout/Alerts';
import SideNavbar from '../SideNavbar';

const CreateReport = (addReport, history) => {
  const [formData, setFormData] = useState({
    reportType: '',
    startDate: '',
    endDate: '',
  });

  const { reportType, startDate, endDate } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addReport(formData, history);
  };

  return (
    <Fragment>
      <SideNavbar />
      <section className='sidebar-container'>
        <Alerts />
        <p className='large'>Create Report</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-table'>
            <table>
              <tbody>
                <tr>
                  <td>Report Type:</td>
                  <td>
                    <div className='form-group'>
                      <select
                        name='reportType'
                        value={reportType}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Report Type</option>
                        <option value='BUDGET ESTIMATE REPORT'>
                          BUDGET ESTIMATE REPORT
                        </option>
                        <option value='SALES REPORT'>SALES REPORT</option>
                        <option value='INQUIRY REPORT'>INQUIRY REPORT</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Start Date:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='startDate'
                        value={startDate}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>End Date:</td>
                  <td>
                    <div className='form-group'>
                      <input
                        type='date'
                        name='endDate'
                        value={endDate}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <input
            type='submit'
            value='Create Report'
            className='btn btn-primary'
          />
          <Link to='/reports' className='btn btn-secondary'>
            BACK
          </Link>
        </form>
      </section>
    </Fragment>
  );
};
CreateReport.propTypes = {
  addReport: PropTypes.func.isRequired,
};

export default connect(null, { addReport })(withRouter(CreateReport));
