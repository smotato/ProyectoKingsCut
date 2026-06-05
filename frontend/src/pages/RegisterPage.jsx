import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await api.post('/auth/register', formData);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error al registrar usuario');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '40px 0' }}>
      <div className="card" style={{ width: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '24px' }}>Regístrate</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Nombre Completo</label>
            <input
              type="text"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
              value={formData.nombre}
              onChange={e => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Correo (Username)</label>
            <input
              type="email"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
              value={formData.correo}
              onChange={e => setFormData({ ...formData, correo: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Teléfono</label>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
              value={formData.telefono}
              onChange={e => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Contraseña</label>
            <input
              type="password"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Confirmar Contraseña</label>
            <input
              type="password"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Registrarse
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: 'var(--color-primary)' }}>Inicia Sesión</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
