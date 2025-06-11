// Rooms.jsx - Enhanced version with more features
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Rooms.css';
import { motion } from 'framer-motion'; // Add framer-motion for animations

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('grid'); // 'grid' or 'list' view
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterRef = useRef(null);
  
  const [filter, setFilter] = useState({
    type: 'all',
    minPrice: 0,
    maxPrice: 1000,
    capacity: 'all',
    amenities: []
  });

  // Available amenities for filtering
  const availableAmenities = [
    'Free WiFi', 'TV', 'Mini Bar', 'Air Conditioning', 
    'Jacuzzi', 'Balcony', 'Sea View', 'Kitchen', 
    'Bathtub', 'Coffee Machine'
  ];

  // Enhanced room data with more details
  useEffect(() => {
    // Simulate API fetch delay
    const fetchData = async () => {
      setLoading(true);
      
      // In a real app, you would fetch from an API
      // This is mock data for demonstration
      const mockRooms = [
        {
          id: 1,
          name: 'Deluxe Room',
          type: 'Deluxe',
          price: 150,
          capacity: 2,
          size: 35, // square meters
          image: '/images/room1.jpg',
          images: [
            '/images/room1.jpg',
            '/images/room2.jpg',
            '/images/room3.jpg'
          ],
          amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Air Conditioning', 'Coffee Machine'].sort(), // Sort for consistency
          description: 'Experience luxury in our spacious Deluxe Room featuring premium amenities and elegant decor. Perfect for couples or business travelers seeking comfort and style.'.trim(), // Ensure no extra whitespace
          rating: 4.8,
          reviews: 124,
          discount: 0
        },
        {
          id: 2,
          name: 'Suite Room',
          type: 'Suite',
          price: 250,
          capacity: 4,
          size: 55,
          image: '/images/room2.jpg',
          images: [
            '/images/room2.jpg',
            '/images/room2-2.jpg',
            '/images/room2-3.jpg'
          ],
          amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Jacuzzi', 'Balcony', 'Sea View', 'Coffee Machine'].sort(), // Sort for consistency
          description: 'Our luxurious Suite Room offers a separate living area, premium amenities, and breathtaking sea views from a private balcony. Perfect for families or extended stays.'.trim(), // Ensure no extra whitespace
          rating: 4.9,
          reviews: 87,
          discount: 10 // 10% discount
        },
        {
          id: 3,
          name: 'Standard Room',
          type: 'Standard',
          price: 100,
          capacity: 2,
          size: 28,
          image: '/images/room3.jpg',
          images: [
            '/images/room3.jpg',
            '/images/room3-2.jpg',
            '/images/room3-3.jpg'
          ],
          amenities: ['Free WiFi', 'TV', 'Air Conditioning'].sort(), // Sort for consistency
         // Ensure no extra whitespace
                  rating: 4.5,
                  reviews: 156,
                  discount: 0
                },
                {
                  id: 4,
                  name: 'Family Suite',
                  type: 'Suite',
                  price: 300,
                  capacity: 6,
                  size: 80,
                  image: '/images/room4.jpg',
                  images: [
                    '/images/room4.jpg',
                    '/images/room4-2.jpg',
                    '/images/room4-3.jpg'
                  ],
                  amenities: ['Free WiFi', 'TV', 'Mini Bar', 'Air Conditioning', 'Kitchen', 'Bathtub', 'Balcony'].sort(), // Sort for consistency
          description: 'Spacious accommodations perfect for family vacations. Features two bedrooms, a fully equipped kitchen, and a comfortable living area to make you feel right at home.'.trim(), // Ensure no extra whitespace
          rating: 4.7,
          reviews: 62,
          discount: 15 // 15% discount
        },
         {
          id: 5,
          name: 'Master Room',
          type: 'Standard',
          price: 240,
          capacity: 2,
          size: 28,
          image: '/images/room5.jpg',
          images: [
            '/images/room3.jpg',
            '/images/room5.jpg',
            '/images/room5.jpg'
          ],
          amenities: ['Free WiFi', 'TV', 'Air Conditioning'].sort(), // Sort for consistency
         // Ensure no extra whitespace
                  rating: 4.5,
                  reviews: 156,
                  discount: 0
                },


            {
          id: 6,
          name: 'Loaner Room',
          type: 'Standard',
          price: 320,
          capacity: 2,
          size: 28,
          image: '/images/room6.jpg',
          images: [
            '/images/room6.jpg',
            '/images/room6.jpg',
            '/images/room6.jpg'
          ],
          amenities: ['Free WiFi', 'TV', 'Air Conditioning'].sort(), // Sort for consistency
         // Ensure no extra whitespace
                  rating: 4.5,
                  reviews: 156,
                  discount: 0
                }     
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setRooms(mockRooms);
        setLoading(false);
      }, 800);
    };
    
    fetchData();
  }, []);

  // Handle clicking outside of filter to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle amenity filter toggle
  const toggleAmenity = (amenity) => {
    if (filter.amenities.includes(amenity)) {
      setFilter({
        ...filter,
        amenities: filter.amenities.filter(a => a !== amenity)
      });
    } else {
      setFilter({
        ...filter,
        amenities: [...filter.amenities, amenity]
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilter({
      type: 'all',
      minPrice: 0,
      maxPrice: 1000,
      capacity: 'all',
      amenities: []
    });
  };

  // Apply filters to rooms
  const filteredRooms = rooms.filter(room => {
    // Filter by room type
    if (filter.type !== 'all' && room.type !== filter.type) return false;
    
    // Filter by price range
    if (room.price < filter.minPrice || room.price > filter.maxPrice) return false;
    
    // Filter by capacity
    if (filter.capacity !== 'all' && room.capacity < parseInt(filter.capacity)) return false;
    
    // Filter by amenities (room must have ALL selected amenities)
    if (filter.amenities.length > 0) {
      const hasAllAmenities = filter.amenities.every(amenity => 
        room.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }
    
    return true;
  });

  // Calculate discounted price if applicable
  const getDisplayPrice = (room) => {
    if (room.discount > 0) {
      const discountedPrice = room.price * (1 - room.discount/100);
      return (
        <div className="room-price">
          <span className="original-price">USD {room.price}</span>
          <span className="discounted-price">USD {discountedPrice.toFixed(0)}</span>
          <span className="discount-badge">-{room.discount}%</span>
        </div>
      );
    }
    return <div className="room-price">USD {room.price}</div>;
  };

  // Show quick view modal for a room
  const openQuickView = (room) => {
    setSelectedRoom(room);
    setShowQuickView(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close quick view modal
  const closeQuickView = () => {
    setShowQuickView(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const roomVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Fix rating stars rendering
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <i key={`star-${i}`} className="fas fa-star filled" aria-hidden="true"></i>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <i key={`star-${i}`} className="fas fa-star-half-alt filled" aria-hidden="true"></i>
        );
      } else {
        stars.push(
          <i key={`star-${i}`} className="fas fa-star" aria-hidden="true"></i>
        );
      }
    }
    return stars;
  };

  return (
    <div className="rooms-page">
      
      {/* Hero Banner */}
      <div className="rooms-header">
        <div className="rooms-header-content">
          <h1>Explore Our Rooms</h1>
          <p>Discover your perfect stay with our selection of luxurious accommodations</p>
        </div>
      </div>
      
      {/* Filter and View Toggle Section */}
      <div className="rooms-controls">
        <button 
          className="filter-toggle"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          aria-expanded={isFilterVisible}
          aria-controls="filter-panel"
        >
          <i className="fas fa-filter" aria-hidden="true"></i> 
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className="view-toggle">
          <button 
            className={activeView === 'grid' ? 'active' : ''}
            onClick={() => setActiveView('grid')}
          >
            <i className="fas fa-th"></i>
          </button>
          <button 
            className={activeView === 'list' ? 'active' : ''}
            onClick={() => setActiveView('list')}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
        
        <div className="results-count">
          {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} found
        </div>
      </div>
      
      <div className="rooms-main-content">
        {/* Filters Panel */}
        <div 
          ref={filterRef}
          id="filter-panel"
          className={`filter-section ${isFilterVisible ? 'visible' : ''}`}
          role="region"
          aria-label="Room filters"
        >
          <div className="filter-header">
            <h3>Filter Rooms</h3>
            <button className="reset-btn" onClick={resetFilters}>Reset All</button>
          </div>
          
          <div className="filter-group">
            <h4>Room Type</h4>
            <select 
              value={filter.type} 
              onChange={(e) => setFilter({...filter, type: e.target.value})}
            >
              <option value="all">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-slider-container">
              <div className="price-inputs">
                <input 
                  type="number" 
                  value={filter.minPrice}
                  onChange={(e) => setFilter({...filter, minPrice: parseInt(e.target.value) || 0})}
                  placeholder="Min"
                  aria-label="Minimum price"
                  min="0"
                  max={filter.maxPrice}
                />
                <span className="price-divider">to</span>
                <input 
                  type="number" 
                  value={filter.maxPrice}
                  onChange={(e) => setFilter({...filter, maxPrice: parseInt(e.target.value) || 0})}
                  placeholder="Max"
                  aria-label="Maximum price"
                  min={filter.minPrice}
                  max="1000"
                />
              </div>
              <div className="price-range">
                <span>USD 0</span>
                <span>USD 1000</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Capacity</h4>
            <select 
              value={filter.capacity} 
              onChange={(e) => setFilter({...filter, capacity: e.target.value})}
            >
              <option value="all">Any Capacity</option>
              <option value="1">1+ Person</option>
              <option value="2">2+ People</option>
              <option value="4">4+ People</option>
              <option value="6">6+ People</option>
            </select>
          </div>
          
          <div className="filter-group amenities-filter">
            <h4>Amenities</h4>
            <div className="amenities-options">
              {availableAmenities.map(amenity => (
                <label key={amenity} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={filter.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span className="checkmark"></span>
                  <span className="amenity-name">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Rooms Display */}
        <div className="rooms-results">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Finding the perfect rooms for you...</p>
            </div>
          ) : filteredRooms.length > 0 ? (
            <motion.div 
              className={`rooms-container ${activeView}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRooms.map(room => (
                <motion.div 
                  key={room.id}
                  className="room-card"
                  variants={roomVariants}
                >
                  <div className="room-image">
                    <img src={room.image} alt={room.name} />
                    {room.discount > 0 && (
                      <div className="discount-tag">
                        {room.discount}% OFF
                      </div>
                    )}
                    <div className="room-actions">
                      <button 
                        className="quick-view-btn"
                        onClick={() => openQuickView(room)}
                      >
                        Quick View
                      </button>
                      <Link to={`/Roomdetails/${room.id}`} className="details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="room-info">
                    <div className="room-type">{room.type}</div>
                    <h3 className="room-name">{room.name}</h3>
                    
                    <div className="room-highlights">
                      <div className="highlight">
                        <i className="fas fa-user-friends"></i>
                        <span>{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <div className="highlight">
                        <i className="fas fa-expand-arrows-alt"></i>
                        <span>{room.size} m²</span>
                      </div>
                    </div>
                    
                    <div className="room-amenities-preview">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="more-amenities">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="room-footer">
                      {getDisplayPrice(room)}
                      <div className="room-rating">
                        <span className="rating-stars" aria-label={`${room.rating} out of 5 stars`}>
                          {renderRatingStars(room.rating)}
                        </span>
                        <span className="review-count">({room.reviews})</span>
                      </div>
                    </div>
                    
                    <Link to={`/booking?roomId=${room.id}`} className="book-now-btn">
                      Book Now
                    </Link>
                  </div>
                  
                  {activeView === 'list' && (
                    <div className="room-description">
                      <p>{room.description}</p>
                      <div className="amenities-full">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-tag">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No rooms found</h3>
              <p>Try adjusting your filters to find available rooms</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && selectedRoom && (
        <div className="quick-view-modal">
          <div className="modal-overlay" onClick={closeQuickView}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={closeQuickView}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-gallery">
              <div className="main-image">
                <img src={selectedRoom.images[0]} alt={selectedRoom.name} />
              </div>
              <div className="thumbnail-images">
                {selectedRoom.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`${selectedRoom.name} view ${index + 1}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            </div>
            
            <div className="modal-details">
              <div className="room-type-badge">{selectedRoom.type}</div>
              <h2>{selectedRoom.name}</h2>
              
              <div className="quick-highlights">
                <div className="highlight">
                  <i className="fas fa-user-friends"></i>
                  <span>{selectedRoom.capacity} Guests</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-expand-arrows-alt"></i>
                  <span>{selectedRoom.size} m²</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-star"></i>
                  <span>{selectedRoom.rating} ({selectedRoom.reviews} reviews)</span>
                </div>
              </div>
              
              <p className="room-description">{selectedRoom.description}</p>
              
              <div className="amenities-section">
                <h3>Room Amenities</h3>
                <div className="amenities-list">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-price-section">
                {selectedRoom.discount > 0 ? (
                  <div className="price-with-discount">
                    <div className="original-price">USD {selectedRoom.price}</div>
                    <div className="final-price">
                      USD {(selectedRoom.price * (1 - selectedRoom.discount/100)).toFixed(0)}
                      <span className="discount-badge">-{selectedRoom.discount}%</span>
                    </div>
                    <div className="price-note">per night</div>
                  </div>
                ) : (
                  <div className="price-standard">
                    <div className="final-price">USD {selectedRoom.price}</div>
                    <div className="price-note">per night</div>
                  </div>
                )}
                
                <div className="modal-actions">
                  <Link to={`/rooms/${selectedRoom.id}`} className="view-details-btn">
                    View Full Details
                  </Link>
                  <Link to={`/booking?roomId=${selectedRoom.id}`} className="book-now-modal-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Rooms;
