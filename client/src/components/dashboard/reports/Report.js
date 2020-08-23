import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNavbar from '../SideNavbar';
import Alerts from '../../layout/Alerts';
import Spinner from '../../layout/Spinner';
import { getReports, deleteReport } from '../../../actions/report';

const Report = ({
  getReports,
  deleteReport,
  report: { reports, loading },
  history,
}) => {
  useEffect(() => {
    getReports();
  }, [getReports]);
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
                <i className='fas fa-phone-line-chart'></i> Reports Generated
              </p>
              <div className='display-table'>
                <table>
                  <thead>
                    <tr>
                      <th>REPORT TYPE</th>
                      <th>ISSUED DATE</th>
                      <th>DURATION CONSIDERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.length > 0 ? (
                      reports.map(report => (
                        <tr key={report._id}>
                          <td>{report.reportType}</td>
                          <td>{report.generatedDate}</td>
                          <td>
                            {report.startDate} - {report.endDate}
                          </td>
                          <td>
                            <Link
                              to={`reports/create-report/${report._id}`}
                              className='btn btn-search'
                            >
                              View
                            </Link>
                            <button
                              onClick={() => deleteReport(report._id, history)}
                              className='btn btn-danger'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='5'> No Reports found </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Link to='reports/create-report' className='btn btn-primary'>
                CREATE REPORT
              </Link>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

Report.propTypes = {
  getReports: PropTypes.func.isRequired,
  deleteReport: PropTypes.func.isRequired,
  report: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  report: state.report,
});

export default connect(mapStateToProps, { getReports, deleteReport })(Report);
