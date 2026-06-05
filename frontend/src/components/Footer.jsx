import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.title}>Kings Cut</h3>
          <p style={styles.text}>La mejor experiencia en barbería clásica y moderna. Cuidamos tu estilo con precisión y pasión.</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>Horarios</h3>
          <p style={styles.text}>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
          <p style={styles.text}>Sábados: 9:00 AM - 6:00 PM</p>
          <p style={styles.text}>Domingos: Cerrado</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>Contacto</h3>
          <p style={styles.text}>Tel: +57 300 123 4567</p>
          <p style={styles.text}>Email: reservas@kingscut.com</p>
          <p style={styles.text}>Dirección: Av. Principal #123, Ciudad</p>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Kings Cut. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#0a0a0a',
    color: '#aaa',
    padding: '40px 20px 0',
    borderTop: '1px solid #222',
    marginTop: 'auto'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    paddingBottom: '32px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  title: {
    color: '#d4af37',
    margin: 0,
    fontSize: '18px'
  },
  text: {
    margin: 0,
    lineHeight: '1.5',
    fontSize: '14px'
  },
  bottomBar: {
    textAlign: 'center',
    padding: '16px',
    borderTop: '1px solid #222',
    fontSize: '12px',
    marginTop: '16px'
  }
};

export default Footer;
