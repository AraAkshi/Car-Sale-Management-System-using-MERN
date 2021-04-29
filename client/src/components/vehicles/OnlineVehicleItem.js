import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import image from '../../img/05.jpg';

const OnlineVehicleItem = ({
  clientVehicle: {
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
  return (
    <Fragment>
      <div className="vehicle-display">
        <div className="vehicle-display-image">
          <img
            src={image}
            alt={<i className="fas fa-car"></i>}
            className="round-img"
          />
        </div>
        <div className="vehicle-display-details p-content">
          <h4>
            {make} {model}
          </h4>
          <h4 className="my-1">{price}</h4>
          <p className="my-1">
            {condition} {specialNotes} {color}
          </p>
          <Link to={`/client-vehicles/${_id}`} className="btn btn-primary">
            Show more details{'>>>'}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

OnlineVehicleItem.propTypes = {
  clientVehicle: PropTypes.object.isRequired,
};

export default OnlineVehicleItem;
