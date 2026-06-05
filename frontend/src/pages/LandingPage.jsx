import React from 'react';
import ImageSlider from '../components/ImageSlider';

const LandingPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <ImageSlider />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '36px', marginBottom: '16px' }}>Bienvenido a Kings Cut</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          La barbería que redefine tu estilo. Disfruta de un ambiente exclusivo y profesionales de primer nivel.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
