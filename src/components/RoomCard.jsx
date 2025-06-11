// RoomCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoomCard.css';

const RoomCard = ({ room }) => {
  const { id, name, type, price, capacity, image, amenities } = room;

  return (
    <div className="room-card">
      <div className="room-image">
        <img src={image} alt={name} />
      </div>
      <div className="room-details">
        <h3>{name}</h3>
        <p className="room-type">{type}</p>
        <p className="room-capacity">Up to {capacity} guests</p>
        <div className="room-amenities">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span key={index}>{amenity}</span>
          ))}
        </div>
        <div className="room-price">
          <p>USD {price} / night</p>
        </div>
        <div className="room-actions">
          <Link to={`/rooms/${id}`} className="details-btn">View Details</Link>
          <Link to={`/booking?roomId=${id}`} className="book-btn">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
