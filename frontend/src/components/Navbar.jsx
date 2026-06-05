import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserCircle, LogOut, Settings, LogIn, UserPlus, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>Kings Cut</Link>
      </div>

      <div style={styles.linksContainer}>
        {user && user.rol === 'CLIENTE' && (
          <>
            <Link to="/booking" style={styles.link}>Reservar Cita</Link>
            <Link to="/client-dashboard" style={styles.link}>Mis Citas</Link>
          </>
        )}
        {user && user.rol === 'BARBERO' && (
          <Link to="/barber-dashboard" style={styles.link}>Mi Agenda</Link>
        )}
        {user && user.rol === 'ADMIN' && (
          <Link to="/admin-dashboard" style={styles.link}>Dashboard</Link>
        )}
      </div>

      <div style={styles.userContainer}>
        <div style={styles.dropdownWrap}>
          <button style={styles.userButton} onClick={() => setMenuOpen(!menuOpen)}>
            {user && (
              <div style={{ marginRight: '12px', textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', lineHeight: '1' }}>{user.nombre}</span>
                <span style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{user.rol}</span>
              </div>
            )}
            <UserCircle size={28} />
            {!user && (
              <span style={{ marginLeft: '8px', display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
                Opciones de usuario
              </span>
            )}
          </button>
          
          {menuOpen && (
            <div style={styles.dropdownMenu}>
              {user ? (
                <>
                  <Link to="/profile" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                    <Settings size={18} /> Editar mi perfil
                  </Link>
                  <button onClick={handleLogout} style={styles.dropdownItemBtn}>
                    <LogOut size={18} /> Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                    <LogIn size={18} /> Iniciar sesión
                  </Link>
                  <Link to="/register" style={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                    <UserPlus size={18} /> Registrarse
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    backgroundColor: '#111',
    borderBottom: '1px solid #333',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  logoContainer: {
    flex: 1
  },
  logo: {
    color: '#d4af37', // Gold color
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontFamily: "'Playfair Display', serif"
  },
  linksContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: '24px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  userContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  dropdownWrap: {
    position: 'relative'
  },
  userButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '12px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column'
  },
  dropdownItem: {
    padding: '12px 16px',
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'background 0.2s'
  },
  dropdownItemBtn: {
    padding: '12px 16px',
    color: '#fff',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s'
  }
};

export default Navbar;
