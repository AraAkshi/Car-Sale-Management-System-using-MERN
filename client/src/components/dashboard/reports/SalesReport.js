import React, { useEffect, Fragment } from 'react';
import ReactPDF from '@react-pdf/renderer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getReportById, addReport } from '../../../actions/report';
import { getSoldVehicles } from '../../../actions/saleVehicle';
import Spinner from '../../layout/Spinner';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    border: 'solid',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const SalesReport = ({
  getReportById,
  getSoldVehicles,
  saleVehicle: { saleVehicles },
  report: { report, loading },
  match: { params },
}) => {
  useEffect(() => {
    getSoldVehicles();
    getReportById(params.report_id);
  }, [getSoldVehicles, getReportById, params.report_id]);

  const today = new Date();
  let totalSales = 0;

  // const soldVehicles = saleVehicles.filter(
  //   vehicle =>
  //     new Date(vehicle.soldDate).getTime() >
  //       new Date(report.startDate).getTime() &&
  //     new Date(vehicle.soldDate).getTime() < new Date(report.endDate).getTime()
  // );

  const onSubmit = () => {
    ReactPDF.render(<SalesReport />, `${__dirname}/example.pdf`);
  };

  return (
    <Fragment>
      <Document>
        <Page size='A4' style={styles.page}>
          <div className='report-container'>
            <View style={styles.section}>
              <div className='report-title'>
                <div className='details'>
                  <p className='large'>NADEESHANS (PVT) LTD</p>
                  <p className='headers'>Dealers in Motor Vehicles</p>
                </div>
              </div>
              <p className='large'>
                <u>MOST SOLD VEHICLES</u>
              </p>
              <div className='report-header'>
                <table>
                  <tbody>
                    <tr>
                      <td className='title'>Report Issued Date:</td>
                      <td className='details'>
                        {`${today.getDate()}. ${
                          today.getMonth() + 1
                        }. ${today.getFullYear()}.`}
                      </td>
                    </tr>
                    <tr>
                      <td className='title'>Most Sold Vehicle:</td>
                      <td className='details'>MARUTI SUZUKI</td>
                    </tr>
                    <tr>
                      <td className='title'>Considered Duration:</td>
                      <td className='details'>
                        {/* {report.startDate} to {report.endDate} */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </View>
            <View style={styles.section}>
              <div className='report-details'>
                <table>
                  <thead>
                    <tr>
                      <th>MAKE</th>
                      <th>MODEL</th>
                      <th>COLOR</th>
                      <th>REVENUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleVehicles.map(vehicle => (
                      <tr>
                        <td>{vehicle.make}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.color}</td>
                        <td>{vehicle.price}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan='3'>TOTAL SALES</td>
                      <td>
                        {saleVehicles.map(vehicle => {
                          totalSales = totalSales + parseInt(vehicle.price);
                        })}
                        {totalSales}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </View>
            <View style={styles.section}>
              <div className='report-footer'>
                <p className='small'>
                  Report Issued by NADEESHANS (PVT) LTD. No. 17 &amp; 19, St.
                  Peter's Place, Bambalapitiya, Colombo 04. Contact: +94 11 250
                  82800/+94 77 732 8634
                </p>
              </div>
            </View>
          </div>
        </Page>
      </Document>
      <button className='btn btn-primary' onClick={() => onSubmit()}>
        Generate PDF
      </button>
    </Fragment>
  );
};

SalesReport.propTypes = {
  addReport: PropTypes.func.isRequired,
  getReportById: PropTypes.func.isRequired,
  getSoldVehicles: PropTypes.func.isRequired,
  saleVehicle: PropTypes.array.isRequired,
  report: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
  report: state.report,
});

export default connect(mapStateToProps, {
  addReport,
  getReportById,
  getSoldVehicles,
})(withRouter(SalesReport));
