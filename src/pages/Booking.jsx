// Booking.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('roomId');

  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    // Load existing bookings from localStorage
    const savedBookings = localStorage.getItem('userBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    
    if (roomId) {
      // Mock data - in a real app, fetch from API using the roomId
      const mockRoom = {
        id: parseInt(roomId),
        name: 'Deluxe Room',
        type: 'Deluxe',
        price: 150,
        capacity: 2,
        image: '/assets/deluxe-room.jpg'
      };
      
      setRoom(mockRoom);
    }
    setLoading(false);
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const calculateTotalPrice = () => {
    if (!room || !bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights * room.price;
  };

  const handleNextStep = () => {
    // Validate current step
    if (bookingStep === 1) {
      if (!bookingData.checkIn || !bookingData.checkOut) {
        alert('Please select check-in and check-out dates');
        return;
      }
      
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      
      if (checkOut <= checkIn) {
        alert('Check-out date must be after check-in date');
        return;
      }
    }
    
    setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!bookingData.name || !bookingData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Generate a unique booking ID
    const newBookingId = Date.now().toString();
    
    // Create booking object
    const newBooking = {
      id: newBookingId,
      roomId: room.id,
      roomName: room.name,
      roomType: room.type,
      roomPrice: room.price,
      ...bookingData,
      totalPrice: calculateTotalPrice(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // Save to local storage
    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    // Update state to show confirmation
    setBookingId(newBookingId);
    setBookingConfirmed(true);
  };
  
  const handleCancelBooking = (id) => {
    // Find the booking and update its status
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? {...booking, status: 'cancelled'} : booking
    );
    
    // Update localStorage and state
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    alert('Your booking has been cancelled.');
    navigate('/my-bookings');
  };

  const resetBooking = () => {
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: 1,
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setBookingStep(1);
    setBookingConfirmed(false);
    setBookingId(null);
  };

  if (loading) {
    return <div className="loading">Loading booking form...</div>;
  }

  // Booking confirmation screen
  if (bookingConfirmed) {
    const booking = bookings.find(b => b.id === bookingId);
    
    return (
      <div className="booking-page">
        
        <div className="booking-container">
          <div className="booking-confirmation">
            <div className="confirmation-icon">✓</div>
            <h1>Booking Confirmed!</h1>
            <p className="confirmation-id">Booking ID: {bookingId}</p>
            
            <div className="confirmation-details">
              <h3>Booking Details</h3>
              <div className="detail-row">
                <span>Room:</span>
                <span>{booking.roomName}</span>
              </div>
              <div className="detail-row">
                <span>Check-in:</span>
                <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Check-out:</span>
                <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Guests:</span>
                <span>{booking.guests}</span>
              </div>
              <div className="detail-row">
                <span>Total Price:</span>
                <span>USD {booking.totalPrice}</span>
              </div>
            </div>
            
            <div className="confirmation-actions">
              <button 
                className="cancel-booking-btn" 
                onClick={() => handleCancelBooking(bookingId)}
              >
                Cancel Booking
              </button>
              <button className="new-booking-btn" onClick={resetBooking}>
                Make Another Booking
              </button>
              <Link to="/my-bookings" className="view-bookings-btn">
                View All Bookings
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="booking-page">
    
    <div className="booking-container">
      <h1>Book Your Stay</h1>
      
      {room ? (
        <div className="booking-content">
          <div className="booking-progress">
            <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-name">Dates & Room</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-name">Guest Info</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-name">Review & Pay</div>
            </div>
          </div>
          
          <div className="selected-room">
            <h2>Selected Room</h2>
            <div className="room-summary">
              <img src={room.image} alt={room.name} />
              <div className="room-summary-details">
                <h3>{room.name}</h3>
                <p className="room-type">{room.type}</p>
                <p className="room-price">USD {room.price} / night</p>
                <Link to="/rooms" className="change-room-btn">Change Room</Link>
              </div>
            </div>
          </div>
          
          <form className="booking-form" onSubmit={handleSubmit}>
            {bookingStep === 1 && (
              <div className="booking-step step-1">
                <h3>Select Dates</h3>
                <div className="form-group date-inputs">
                  <div className="form-field">
                    <label htmlFor="checkIn">Check-in Date*</label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={bookingData.checkIn}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="checkOut">Check-out Date*</label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={bookingData.checkOut}
                      onChange={handleInputChange}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label htmlFor="guests">Number of Guests</label>
                  <select 
                    id="guests" 
                    name="guests" 
                    value={bookingData.guests} 
                    onChange={handleInputChange}
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="date-summary">
                    <p>
                      {Math.floor((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / 
                        (1000 * 60 * 60 * 24))} night(s) stay
                    </p>
                    <p className="stay-price">
                      Total: USD {calculateTotalPrice()}
                    </p>
                  </div>
                )}
                
                <div className="step-buttons">
                  <button type="button" className="next-step-btn" onClick={handleNextStep}>
                    Continue to Guest Information
                  </button>
                </div>
              </div>
            )}
            
            {bookingStep === 2 && (
              <div className="booking-step step-2">
                <h3>Guest Information</h3>
                
                <div className="form-field">
                  <label htmlFor="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="email">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="step-buttons">
                  <button type="button" className="prev-step-btn" onClick={handlePrevStep}>
                    Back
                  </button>
                  <button type="button" className="next-step-btn" onClick={handleNextStep}>
                    Review Booking
                  </button>
                </div>
              </div>
            )}
            
            {bookingStep === 3 && (
              <div className="booking-step step-3">
                <h3>Review Your Booking</h3>
                
                <div className="booking-summary">
                  <div className="summary-section">
                    <h4>Stay Details</h4>
                    <div className="summary-row">
                      <span>Room:</span>
                      <span>{room.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>Check-in:</span>
                      <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="summary-row">
                      <span>Check-out:</span>
                      <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="summary-row">
                      <span>Guests:</span>
                      <span>{bookingData.guests}</span>
                    </div>
                    <div className="summary-row">
                      <span>Night(s):</span>
                      <span>
                        {Math.floor((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / 
                          (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="summary-section">
                    <h4>Guest Information</h4>
                    <div className="summary-row">
                      <span>Name:</span>
                      <span>{bookingData.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>Email:</span>
                      <span>{bookingData.email}</span>
                    </div>
                    {bookingData.phone && (
                      <div className="summary-row">
                        <span>Phone:</span>
                        <span>{bookingData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="summary-section price-summary">
                    <div className="summary-row">
                      <span>Room Rate:</span>
                      <span>USD {room.price} × {Math.floor((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / 
                        (1000 * 60 * 60 * 24))} night(s)</span>
                    </div>
                    <div className="summary-row">
                      <span>Taxes & Fees:</span>
                      <span>USD {Math.round(calculateTotalPrice() * 0.12)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Price:</span>
                      <span>USD {calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.12)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="cancellation-policy">
                  <h4>Cancellation Policy</h4>
                  <p>Free cancellation until 24 hours before check-in. If cancelled later, the first night will be charged.</p>
                </div>
                
                <div className="payment-agreement">
                  <input type="checkbox" id="termsAgreement" required />
                  <label htmlFor="termsAgreement">
                    I agree to the terms and conditions and cancellation policy
                  </label>
                </div>
                
                <div className="step-buttons">
                  <button type="button" className="prev-step-btn" onClick={handlePrevStep}>
                    Back
                  </button>
                  <button type="submit" className="submit-booking">
                    Confirm and Pay
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="no-room-selected">
          <p>No room selected. Please choose a room first.</p>
          <Link to="/rooms" className="browse-rooms-btn">Browse Rooms</Link>
        </div>
      )}
    </div>
    
    <Footer />
    </div>
  );
};

export default Booking;
