// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Feature from '../components/Feature';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function HomePage() {
  const navigate = useNavigate();
  const [logoutButtonHover, setLogoutButtonHover] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  const carouselItems = [
    {
      image: '/images/feature1.jpeg',
      text: 'Connect with mentors and alumni',
    },
    {
      image: '/images/feature2.jpeg',
      text: 'Join study groups and collaborate',
    },
    {
      image: '/images/feature3.jpeg',
      text: 'Access academic resources',
    },
    {
      image: '/images/feature4.jpeg',
      text: 'Gain career insights and advice',
    },
  ];

  return (
    <div style={styles.container}>
      <section style={styles.intro}>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={true}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {carouselItems.map((item, index) => (
            <div key={index} style={styles.carouselItem}>
              <img src={item.image} alt={item.text} style={styles.carouselImage} />
              <p style={styles.carouselText}>{item.text}</p>
            </div>
          ))}
        </Carousel>
      </section>
      <div style={styles.featuresContainer}>
        <Feature
          title="Mentorship"
          description="Connect with mentors"
          link="/mentorship"
        />
        <Feature
          title="Study Groups"
          description="Join study groups"
          link="/studygroup"
        />
        <Feature
          title="Resources"
          description="Access resources"
          link="/resourcesharing"
        />
        <Feature
          title="Career Insights"
          description="Gain insights"
          link="/careerinsights"
        />
      </div>
      <button
        style={{
          ...styles.logoutButton,
          ...(logoutButtonHover ? styles.logoutButtonHover : {})
        }}
        onMouseEnter={() => setLogoutButtonHover(true)}
        onMouseLeave={() => setLogoutButtonHover(false)}
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/auth');
        }}
      >
        Logout
      </button>
    </div>
  );
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const styles = {
  container: {
    width: '100vw', // Ensure the container takes up the full width
    height: '100%',
    boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
    justifyContent: 'space-between', // Distribute space evenly between elements
    padding: '20px',
    backgroundColor: '#fff7f0', // Light orange background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden', // Prevent horizontal scrolling
  },
  intro: {
    width: '100%', // Ensure the intro section takes up the full width
    marginBottom: '20px',
    maxWidth: '1200px', // Adjust the max width as needed
  },
  carouselItem: {
    position: 'relative',
    textAlign: 'center',
    color: '#fff',
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    maxHeight: '400px', // Adjust the height to make the image smaller
  },
  carouselText: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '5px',
  },
  featuresContainer: {
    display: 'grid', // Use grid layout
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
    gap: '30px',
    width: '100%', // Ensure the features container takes up the full width
    maxWidth: '1200px', // Adjust the max width as needed
    justifyItems: 'center', // Center align items horizontally
  },
  logoutButton: {
    backgroundColor: '#ff7043', // Vibrant orange
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#e64a19',
    transform: 'scale(1.05)',
  },
};

export default HomePage;
