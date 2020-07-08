import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VehicleItem = ({
  vehicle: { _id, make, model, color, price, condition, images, specialNotes },
}) => {
  return (
    <div className='vehicle bg-light'>
      <img src={images} alt='image' className='round-img' />
      <div>
        <h3>
          {make} {model}
        </h3>
        <h4 className='my-1'>{price}</h4>
        <p className='my-1'>
          {condition} {specialNotes} {color}
        </p>
        <Link to={`/vehicle/${_id}`} className='btn btn-primary'>
          Show more details >>>
        </Link>
      </div>
    </div>
  );
};

VehicleItem.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleItem;
