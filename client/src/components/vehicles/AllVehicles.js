import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VehicleItem from './SaleVehicleItem';
import { getSaleVehicles } from '../../actions/saleVehicle';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import Alerts from '../layout/Alerts';

const AllVehicles = ({
  getSaleVehicles,
  saleVehicle: { saleVehicles, loading },
}) => {
  useEffect(() => {
    getSaleVehicles();
  }, [getSaleVehicles]);

  const [word, setWord] = useState('');
  const [filterDisplay, setFilterDisplay] = useState(saleVehicles);

  const onChange = e => {
    let oldList = saleVehicles.map(vehicle => {
      return {
        make: vehicle.make.toUpperCase(),
        model: vehicle.model.toUpperCase(),
      };
    });

    if (e !== '') {
      let newList = oldList.filter(vehicle => {
        vehicle.model.includes(word.toUpperCase());
        vehicle.make.includes(word.toUpperCase());
      });
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(saleVehicles);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <section className='container'>
        <Alerts />
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className='large text-primary'>
                <i className='fas fa-car'></i>On Sale Vehicles
              </h1>
              <form className='form'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-dashboard'
                    onChange={e => onChange(e.target.value)}
                    placeholder='Search On Sale Vehicles'
                  />
                </div>
              </form>
              <div className='vehicles'>
                {filterDisplay.map((saleVehicle, x) => (
                  <div key={x}>
                    <VehicleItem
                      key={saleVehicle._id}
                      saleVehicle={saleVehicle}
                    />
                  </div>
                ))}
                {/* {vehicles.length > 0 ? (
                  vehicles.map(vehicle => (
                    <VehicleItem key={vehicle._id} vehicle={vehicle} />
                  ))
                ) : (
                  <h5>No vehicles found</h5>
                )} */}
              </div>
            </Fragment>
          )}
        </Fragment>
      </section>
    </Fragment>
  );
};

AllVehicles.propTypes = {
  getSaleVehicles: PropTypes.func.isRequired,
  saleVehicle: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  saleVehicle: state.saleVehicle,
});

export default connect(mapStateToProps, { getSaleVehicles })(AllVehicles);
