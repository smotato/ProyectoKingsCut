import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(correo, password);
      if (user.rol === 'ADMIN') navigate('/admin-dashboard');
      else if (user.rol === 'BARBERO') navigate('/barber-dashboard');
      else navigate('/booking');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
          required
        />
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
