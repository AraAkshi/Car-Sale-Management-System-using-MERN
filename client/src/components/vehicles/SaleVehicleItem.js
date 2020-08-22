import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VehicleItem = ({
  saleVehicle: {
    _id,
    make,
    model,
    color,
    price,
    condition,
    images,
    specialNotes,
  },
}) => {
  const x = '/' + images[0];
  console.log(x);
  return (
    <Fragment>
      <div className='vehicle-display'>
        <div className='vehicle-display-image'>
          <img src={'/' + images[0]} alt='Nadeeshans' className='round-img' />
        </div>
        <div className='vehicle-display-details p-content'>
          <h4>
            {make} {model}
          </h4>
          <h4 className='my-1'>{price}</h4>
          <p className='my-1'>
            {condition} {specialNotes} {color}
          </p>
          <Link to={`/on-sale-vehicles/${_id}`} className='btn btn-primary'>
            Show more details{'>>>'}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

VehicleItem.propTypes = {
  saleVehicle: PropTypes.object.isRequired,
};

export default VehicleItem;
