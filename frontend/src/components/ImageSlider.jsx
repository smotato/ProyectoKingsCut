import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80'
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {images.map((src, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            opacity: index === currentIndex ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${src})`
          }}
        >
          <div style={styles.overlayText}>
            <h1>Estilo y Precisión</h1>
            <p>Donde la tradición se encuentra con la vanguardia</p>
          </div>
        </div>
      ))}
      <div style={styles.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: index === currentIndex ? '#d4af37' : 'rgba(255,255,255,0.5)'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '400px', // or 50vh
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: '40px',
    borderRadius: '12px'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  overlayText: {
    color: '#fff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
  },
  dots: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};

export default ImageSlider;
