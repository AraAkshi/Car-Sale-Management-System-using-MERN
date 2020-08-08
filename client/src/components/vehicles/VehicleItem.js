import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VehicleItem = ({
  vehicle: { _id, make, model, color, price, condition, images, specialNotes },
}) => {
  /*let imageUrl = '';
  const imagePath = { images }[0].split('\\');
  for (let x = 0; x < imagePath; x++) {
    imageUrl = +imagePath[x] + '/';
  }*/

  return (
    <Fragment>
      <div class='vehicle-display'>
        <div class='vehicle-display-image'>
          <img src={images[0]} alt='vehicle' className='round-img' />
        </div>
        <p class='vehicle-display-details p-content'>
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
        </p>
      </div>
    </Fragment>
  );
};

VehicleItem.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleItem;
