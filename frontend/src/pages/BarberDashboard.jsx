import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ImageSlider from '../components/ImageSlider';

const BarberDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const barberId = user?.id;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await api.get(`/appointments/barber/${barberId}`);
    setAppointments(res.data);
  };

  const handleComplete = async (id) => {
    await api.put(`/appointments/${id}/status`, { estado: 'COMPLETADA' });
    fetchAppointments();
  };

  const cancelAppointment = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta cita?")) {
      await api.put(`/appointments/${id}/status`, { estado: 'CANCELADA' });
      fetchAppointments();
    }
  };

  const saveReschedule = async (id) => {
    if (!newDate) return;
    try {
      const body = { fechaHora: newDate };
      await api.put(`/appointments/${id}`, body);
      setEditingId(null);
      setNewDate('');
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <ImageSlider />
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Agenda del Barbero</h2>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {appointments.map(a => (
          <div key={a.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '18px' }}>{new Date(a.fechaHora).toLocaleString()}</h4>
              <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                Cliente: {a.cliente.nombre} | Servicio: {a.servicio.nombre}
              </p>
              <span style={{ 
                display: 'inline-block', marginTop: '8px', padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                backgroundColor: a.estado === 'PENDIENTE' ? '#333' : a.estado === 'COMPLETADA' ? 'var(--color-primary)' : 'darkred',
                color: a.estado === 'COMPLETADA' ? '#000' : '#fff'
              }}>
                {a.estado}
              </span>
              {editingId === a.id && (
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
                  />
                  <button className="btn btn-primary" onClick={() => saveReschedule(a.id)}>Guardar</button>
                  <button className="btn btn-secondary" onClick={() => { setEditingId(null); setNewDate(''); }}>Cancelar</button>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              {a.estado === 'PENDIENTE' && editingId !== a.id && (
                <>
                  <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: 'black' }} onClick={() => handleComplete(a.id)}>Completar</button>
                  <button className="btn btn-secondary" onClick={() => { setEditingId(a.id); setNewDate(''); }}>Reprogramar</button>
                  <button className="btn btn-primary" style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={() => cancelAppointment(a.id)}>Cancelar Cita</button>
                </>
              )}
            </div>
          </div>
        ))}
        {appointments.length === 0 && <p>No hay citas asignadas.</p>}
      </div>
      <div style={{ marginTop: '40px' }}>
         <a href="/" style={{ color: 'var(--color-primary)' }}>← Volver al inicio</a>
      </div>
    </div>
  );
};

export default BarberDashboard;
