// Home.jsx - Full code with enhanced hero section and improved Popular Rooms section
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Home.css';

// Add Font Awesome import at the top of your file
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroBackground, setHeroBackground] = useState(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const roomsSliderRef = useRef(null);
  
  // Hero background images
  const heroBackgrounds = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg'
  ];

  // Popular room data
  const popularRooms = [
    {
      id: 1,
      name: "Luxury Suite",
      image: "/images/room1.jpg",
      price: 299,
      rating: 4.9
    },
    {
      id: 2,
      name: "Ocean View Room",
      image: "/images/room2.jpg",
      price: 199,
      rating: 4.7
    },
    {
      id: 3,
      name: "Family Apartment",
      image: "/images/room3.jpg",
      price: 249,
      rating: 4.8
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "/images/testimonial1.jpg",
      role: "Business Traveler",
      text: "The hotel exceeded all my expectations. The staff was incredibly attentive and the room was perfect for my business trip. I'll definitely be coming back!"
    },
    {
      id: 2,
      name: "Michael & Lisa",
      photo: "/images/testimonial2.jpg",
      role: "Honeymoon Couple",
      text: "We couldn't have chosen a better place for our honeymoon. The romantic package was worth every penny, and the views were absolutely breathtaking."
    },
    {
      id: 3,
      name: "David Thompson",
      photo: "/images/testimonial3.jpg",
      role: "Family Vacation",
      text: "Traveling with kids can be challenging, but this hotel made it easy. The family suite was spacious, and the kids loved the pool area. Perfect family getaway!"
    }
  ];

  // Function to scroll to a specific room in the slider
  const scrollToRoom = (index) => {
    if (roomsSliderRef.current) {
      const slider = roomsSliderRef.current;
      const roomElements = slider.querySelectorAll('.room-slide');
      
      if (roomElements[index]) {
        const roomOffsetLeft = roomElements[index].offsetLeft;
        slider.scrollTo({
          left: roomOffsetLeft - slider.offsetLeft,
          behavior: 'smooth'
        });
        setActiveRoom(index);
      }
    }
  };

  useEffect(() => {
    // Fade in effect when component mounts
    setIsVisible(true);
    
    // Testimonial auto-rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    // Hero background rotation
    const bgInterval = setInterval(() => {
      setHeroBackground(prev => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(bgInterval);
    };
  }, [testimonials.length, heroBackgrounds.length]);

  // Track which room is visible in the slider
  useEffect(() => {
    const handleScroll = () => {
      if (roomsSliderRef.current) {
        const slider = roomsSliderRef.current;
        const scrollPosition = slider.scrollLeft;
        const roomElements = slider.querySelectorAll('.room-slide');
        
        let closestRoom = 0;
        let minDistance = Infinity;
        
        roomElements.forEach((room, index) => {
          const distance = Math.abs(room.offsetLeft - scrollPosition);
          if (distance < minDistance) {
            minDistance = distance;
            closestRoom = index;
          }
        });
        
        setActiveRoom(closestRoom);
      }
    };
    
    const slider = roomsSliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Animate on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView) {
          el.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top visibility
  useEffect(() => {
    const handleScrollToTopVisibility = () => {
      const scrollToTopBtn = document.querySelector('.scroll-to-top');
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', handleScrollToTopVisibility);
    return () => window.removeEventListener('scroll', handleScrollToTopVisibility);
  }, []);

  return (
    <div className={`home-page ${isVisible ? 'visible' : ''}`}>
      
      <div 
        className="hero-section" 
        style={{backgroundImage: `url(${heroBackgrounds[heroBackground]})`}}
      >
        <div className="hero-content">
          <h1 className="animated-text">Welcome to Luxury Hotel</h1>
          <p className="animated-text-delay">Experience unparalleled comfort and elegance</p>
          <div className="cta-container">
            <Link to="/rooms" className="cta-button primary-cta">Browse Rooms</Link>
            <a href="#about" className="cta-button secondary-cta">Learn More</a>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="booking-bar">
        <div className="booking-form-container">
          <h3>Quick Reservation</h3>
          <form className="quick-booking-form">
            <div className="form-group">
              <label>Check In</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Check Out</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Guests</label>
              <select>
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
              </select>
            </div>
            <button type="submit" className="check-availability-btn">Check Availability</button>
          </form>
        </div>
      </div>
      
      <section className="features scroll-animate">
        <div className="section-header">
          <h2>Hotel <span className="highlight">Features</span></h2>
          <p>Discover what makes our hotel special</p>
        </div>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-hotel"></i>
            </div>
            <h3>Luxury Rooms</h3>
            <p>Experience comfort like never before in our meticulously designed rooms with premium bedding and amenities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <h3>Fine Dining</h3>
            <p>Indulge in exquisite cuisine prepared by award-winning chefs using the freshest local ingredients.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-water"></i>
            </div>
            <h3>Infinity Pool</h3>
            <p>Relax in our stunning infinity pool with panoramic views of the surrounding landscape.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-hot-tub"></i>
            </div>
            <h3>Luxury Spa</h3>
            <p>Rejuvenate your body and mind with our range of spa treatments and wellness packages.</p>
          </div>
        </div>
      </section>
      
      <section id="about" className="about-section scroll-animate">
        <div className="about-image">
          <div className="image-container"></div>
        </div>
        <div className="about-content">
          <h2>About <span className="highlight">Our Hotel</span></h2>
          <p className="subtitle">A Legacy of Luxury Since 1995</p>
          <p>Located in the heart of the city, our hotel offers the perfect blend of comfort and luxury. With state-of-the-art amenities and exceptional service, we ensure your stay is nothing short of extraordinary.</p>
          <p>Our dedication to excellence has earned us numerous accolades, including the prestigious Five-Star rating for ten consecutive years.</p>
          <ul className="about-features">
            <li><i className="fas fa-check-circle"></i> 24/7 Room Service</li>
            <li><i className="fas fa-check-circle"></i> Complimentary Breakfast</li>
            <li><i className="fas fa-check-circle"></i> Airport Shuttle Service</li>
            <li><i className="fas fa-check-circle"></i> Concierge Assistance</li>
          </ul>
          <Link to="/rooms" className="about-cta">Explore Our Rooms</Link>
        </div>
      </section>
      
      {/* Enhanced Popular Rooms Section */}
      <section className="popular-rooms scroll-animate">
        <div className="section-header">
          <h2>Popular <span className="highlight">Rooms</span></h2>
          <p>Our most booked accommodations</p>
        </div>
        
        <div className="rooms-slider" ref={roomsSliderRef}>
          {popularRooms.map(room => (
            <div className="room-slide" key={room.id}>
              <div className="room-image">
                <img src={room.image} alt={room.name} />
                <div className="room-overlay">
                  <Link to={`/Roomdetails/${room.id}`} className="view-details">View Details</Link>
                </div>
                <div className="room-price">${room.price}<span>/night</span></div>
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <div className="room-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(room.rating) ? 'filled' : ''}`}></i>
                    ))}
                    {room.rating % 1 !== 0 && <i className="fas fa-star-half-alt filled"></i>}
                  </div>
                  <span>{room.rating}/5</span>
                </div>
                <Link to={`/booking?roomId=${room.id}`} className="book-now-btn">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation dots for mobile */}
        <div className="rooms-navigation">
          {popularRooms.map((_, index) => (
            <div 
              key={index} 
              className={`room-nav-dot ${activeRoom === index ? 'active' : ''}`}
              onClick={() => scrollToRoom(index)}
            ></div>
          ))}
        </div>
        
        <div className="view-all-container">
          <Link to="/rooms" className="view-all-rooms">View All Rooms</Link>
        </div>
      </section>
      
      <section className="testimonials scroll-animate">
        <div className="section-header">
          <h2>Guest <span className="highlight">Testimonials</span></h2>
          <p>What our guests say about their stay</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonial-controls">
            <button 
              className="prev-testimonial" 
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="next-testimonial" 
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-slide ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    {testimonial.photo && (
                      <div className="author-image">
                        <img src={testimonial.photo} alt={testimonial.name || `Testimonial ${testimonial.id}`} />
                      </div>
                    )}
                    {(testimonial.name || testimonial.role) && (
                      <div className="author-info">
                        {testimonial.name && <h4>{testimonial.name}</h4>}
                        {testimonial.role && <p>{testimonial.role}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="newsletter scroll-animate">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with our latest offers, promotions and news</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
      
      <section className="location scroll-animate">
        <div className="section-header">
          <h2>Our <span className="highlight">Location</span></h2>
          <p>Find us in the heart of the city</p>
        </div>
        <div className="map-container">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2654653845396!2d73.91234681484266!3d18.562551687384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20-%20Pune!5e0!3m2!1sen!2sin!4v1657154938306!5i"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Location"
            ></iframe>
          </div>
        </div>
        <div className="location-details">
          <div className="location-info">
            <i className="fas fa-location-dot"></i>
            <p>123 Luxury Avenue, City Center, India</p>
          </div>
          <div className="location-info">
            <i className="fas fa-phone"></i>
            <p>+1 (234) 567-8900</p>
          </div>
          <div className="location-info">
            <i className="fas fa-envelope"></i>
            <p>info@luxuryhotel.com</p>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <div className="scroll-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <i className="fas fa-chevron-up"></i>
      </div>
    </div>
  );
};

export default Home;
