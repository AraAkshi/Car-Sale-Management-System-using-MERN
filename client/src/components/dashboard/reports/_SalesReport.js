import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getReportById, addReport } from '../../../actions/report';
import { getSoldVehicles } from '../../../actions/saleVehicle';

const SalesReport = ({
  getReportById,
  getSoldVehicles,
  saleVehicle: { saleVehicles },
  match: { params },
}) => {
  useEffect(() => {
    getSoldVehicles();
    getReportById(params.report_id);
  }, [getSoldVehicles, getReportById, params.report_id]);

  const startDate = params.id;
  const endDate = params.id;

  const today = new Date();
  const startDateNew = new Date(startDate);
  const endDateNew = new Date(endDate);
  let totalSales = 0;

  const soldVehicles = saleVehicles.filter(
    vehicle =>
      new Date(vehicle.soldDate).getTime() >> startDateNew.getTime() &&
      new Date(vehicle.soldDate).getTime() < endDateNew.getTime()
  );

  const onSubmit = async e => {
    e.preventDefault();
    addReport({ startDate, endDate, reportType: 'SALES REPORT' });
  };

  return (
    <Fragment>
      <section className='report-container'>
        <div className='report-title'>
          <div className='details'>
            <h2 className='large'>NADEESHANS (PVT) LTD</h2>
            <h4 className='small'>Dealers in Motor Vehicles</h4>
          </div>
        </div>
        <h2 className='large'>
          <b>
            <u>MOST SOLD VEHICLES</u>
          </b>
        </h2>
        <form>
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
                    {startDate} to {endDate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                {soldVehicles.map(vehicle => (
                  <tr>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.color}</td>
                    <td>{vehicle.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colspan='4'>TOTAL SALES</td>
                  <td>
                    {soldVehicles.map(vehicle => {
                      totalSales = totalSales + parseInt(vehicle.price);
                    })}
                  </td>
                </tr>
                <tr>
                  <td colspan='4'>TOTAL REVENUE</td>
                  <td>{totalSales}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button classNameName='btn btn-primary' onClick={() => onSubmit()}>
            Generate PDF
          </button>
        </form>
        <div className='report-footer'>
          <p className='small'>
            Report Issued by NADEESHANS (PVT) LTD. No. 17 &amp; 19, St. Peter's
            Place, Bambalapitiya, Colombo 04. Contact: +94 11 250 82800/+94 77
            732 8634
          </p>
        </div>
      </section>
    </Fragment>
  );
};

SalesReport.propTypes = {
  addReport: PropTypes.func.isRequired,
  getReportById: PropTypes.func.isRequired,
  getSoldVehicles: PropTypes.func.isRequired,
  saleVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
});

export default connect(mapStateToProps, {
  addReport,
  getReportById,
  getSoldVehicles,
})(withRouter(SalesReport));
