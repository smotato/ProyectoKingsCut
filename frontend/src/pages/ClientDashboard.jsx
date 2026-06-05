import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ImageSlider from '../components/ImageSlider';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newBarberId, setNewBarberId] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchBarbers();
  }, [user]);

  const fetchAppointments = async () => {
    if (user && user.id) {
      try {
        const res = await api.get(`/appointments/client/${user.id}`);
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchBarbers = async () => {
    try {
      const res = await api.get('/users/barbers');
      setBarbers(res.data);
    } catch (err) {
      console.error(err);
    }
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
      if (newBarberId) {
        body.barbero = { id: parseInt(newBarberId) };
      }
      await api.put(`/appointments/${id}`, body);
      setEditingId(null);
      setNewDate('');
      setNewBarberId('');
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <ImageSlider />
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Mis Citas Programadas</h2>

      {appointments.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {appointments.map(a => (
            <div key={a.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>{a.servicio?.nombre}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                  {new Date(a.fechaHora).toLocaleString()} -
                  <strong style={{ color: a.estado === 'PENDIENTE' ? 'orange' : a.estado === 'COMPLETADA' ? 'var(--color-primary)' : 'red', marginLeft: '8px' }}>
                    {a.estado}
                  </strong>
                </p>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                  Barbero:
                  <strong style={{ color: 'var(--color-primary)', marginLeft: '8px' }}>
                    {a.barbero?.nombre}
                  </strong>
                </p>
                {editingId === a.id && (
                  <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="datetime-local"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
                    />
                    <select
                      value={newBarberId}
                      onChange={e => setNewBarberId(e.target.value)}
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: '#fff' }}
                    >
                      <option value="">Mantener mismo barbero</option>
                      {barbers.map(b => <option key={b.id} value={b.id}>{b.nombre}</option>)}
                    </select>
                    <button className="btn btn-primary" onClick={() => saveReschedule(a.id)}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => { setEditingId(null); setNewDate(''); setNewBarberId(''); }}>Cancelar</button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                {a.estado === 'PENDIENTE' && editingId !== a.id && (
                  <>
                    <button className="btn btn-secondary" onClick={() => {
                      setEditingId(a.id);
                      setNewBarberId(a.barbero?.id || '');
                    }}>Reprogramar</button>
                    <button className="btn btn-primary" style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={() => cancelAppointment(a.id)}>Cancelar Cita</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
