import axios from 'axios';
import { setAlert } from './alerts';

import { GET_REPORT, GET_REPORTS, REPORT_ERRORS, DELETE_REPORT } from './types';

//Add Report
export const addReport = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/reports', formData, config);

    dispatch({
      type: GET_REPORT,
      payload: res.data,
    });

    dispatch(setAlert('Report Details Added Successfully', 'success'));
    history.push(`/reports`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REPORT_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get All Reports
export const getReports = () => async dispatch => {
  try {
    const res = await axios.get('/api/reports');

    dispatch({
      type: GET_REPORTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get selected Report
export const getReportById = report_id => async dispatch => {
  try {
    const res = await axios.get(`/api/reports/${report_id}`);

    dispatch({
      type: GET_REPORT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REPORT_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Report
export const deleteReport = (report_id, history) => async dispatch => {
  if (
    window.confirm('Do you want to Delete the Report? This can NOT be undone!')
  ) {
    try {
      const res = await axios.delete(`/api/reports/${report_id}`);

      dispatch({ type: DELETE_REPORT });
      history.push(`/dashboard`);
      dispatch(setAlert('Report Details Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: REPORT_ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Update Reports
export const updateReport = (
  formData,
  report_id,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/report/${report_id}`, formData, config);

    dispatch({
      type: GET_REPORT,
      payload: res.data,
    });

    dispatch(setAlert('Report Details Updated Successfully', 'success'));
    history.push(`/reports`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REPORT_ERRORS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
