import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        // Simulating API call with mock data
        const mockRoom = {
          id: parseInt(id),
          name: 'Deluxe Room',
          type: 'Deluxe',
          price: 150,
          capacity: 2,
          size: 35,
          description: 'Experience luxury in our spacious Deluxe Room featuring premium amenities and elegant decor.',
          image: '/images/room1.jpg',
          images: [
            '/images/room1.jpg',
            '/images/room2.jpg',
            '/images/room3.jpg'
          ],
          amenities: [
            'Free WiFi',
            'TV',
            'Mini Bar',
            'Air Conditioning',
            'Coffee Machine'
          ],
          rating: 4.8,
          reviews: 124,
          discount: 0
        };

        // Remove setTimeout to test if loading is the issue
        setRoom(mockRoom);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  // Add console.log to debug state values
  console.log('Loading:', loading);
  console.log('Room:', room);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="error-container">
        <div className="error">Room not found</div>
      </div>
    );
  }

  return (
    <div className="room-details-container">
      <div className="room-details-header">
        <h1>{room.name}</h1>
        <span className="room-type">{room.type}</span>
      </div>

      <div className="room-images-gallery">
        {room.images.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`${room.name} - View ${index + 1}`}
            className="room-gallery-image"
          />
        ))}
      </div>

      <div className="room-info-grid">
        <div className="room-info-main">
          <h2>Room Description</h2>
          <p>{room.description}</p>

          <h2>Amenities</h2>
          <div className="amenities-list">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon">✓</span>
                {amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="room-info-sidebar">
          <div className="booking-card">
            <h3>Price Details</h3>
            <div className="price-container">
              <span className="price-amount">${room.price}</span>
              <span className="price-period">per night</span>
            </div>
            {room.discount > 0 && (
              <div className="discount-badge">
                {room.discount}% OFF
              </div>
            )}
            <div className="room-specs">
              <div className="spec-item">
                <span className="spec-label">Size:</span>
                <span className="spec-value">{room.size} m²</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Capacity:</span>
                <span className="spec-value">Up to {room.capacity} guests</span>
              </div>
            </div>
            <button className="book-now-btn">
              Book Now
            </button>
          </div>

          <div className="rating-card">
            <h3>Rating & Reviews</h3>
            <div className="rating-container">
              <span className="rating-score">{room.rating}</span>
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < Math.floor(room.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="review-count">({room.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
