import React, { useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        correo: user.correo || '',
        telefono: user.telefono || '',
        password: '', // empty by default
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      const body = {
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        rol: user.rol // preserve role
      };
      if (formData.password) {
        body.password = formData.password;
      }
      const res = await api.put(`/users/${user.id}`, body);
      // We must manually update context state or they could have trouble if they changed email
      // But it's easier to force them to login again if they changed credentials
      if (formData.correo !== user.correo || formData.password) {
        setMessage('Perfil actualizado. Por favor, vuelve a iniciar sesión si cambiaste tus credenciales.');
      } else {
        setMessage('Perfil actualizado exitosamente.');
      }
    } catch (err) {
      setMessage('Error al actualizar perfil.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Mi Perfil</h2>

      {message && <p style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>{message}</p>}

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Nombre Completo</label>
            <input 
              type="text" 
              value={formData.nombre} 
              onChange={e => setFormData({...formData, nombre: e.target.value})} 
              style={inputStyle} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Correo (Username)</label>
            <input 
              type="email" 
              value={formData.correo} 
              onChange={e => setFormData({...formData, correo: e.target.value})} 
              style={inputStyle} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Teléfono</label>
            <input 
              type="text" 
              value={formData.telefono} 
              onChange={e => setFormData({...formData, telefono: e.target.value})} 
              style={inputStyle} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Nueva Contraseña (Opcional)</label>
            <input 
              type="password" 
              placeholder="Dejar en blanco para no cambiar"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              style={inputStyle} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Confirmar Nueva Contraseña</label>
            <input 
              type="password" 
              placeholder="Confirmar contraseña si escribiste una nueva"
              value={formData.confirmPassword} 
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
              style={inputStyle} 
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid var(--color-border)', 
  background: 'var(--color-background)', 
  color: '#fff',
  boxSizing: 'border-box'
};

export default ProfilePage;
