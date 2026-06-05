import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookingWizard = () => {
  const { user, logout } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    servicioId: null,
    barberoId: null,
    fechaHora: '',
    clienteId: user?.id
  });

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data));
    api.get('/users/barbers').then(res => setBarbers(res.data));
  }, []);

  const handleBooking = async () => {
    try {
      const payload = {
        cliente: { id: bookingData.clienteId },
        barbero: { id: bookingData.barberoId },
        servicio: { id: bookingData.servicioId },
        fechaHora: bookingData.fechaHora
      };
      await api.post('/appointments', payload);
      alert('Cita reservada con éxito');
      setStep(4);
    } catch (e) {
      console.error(e);
      alert('Error al reservar');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Reservar Cita</h2>
      
      {step === 1 && (
        <div className="card">
          <h3>Paso 1: Selecciona un Servicio</h3>
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            {services.map(s => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <div>
                  <h4>{s.nombre}</h4>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{s.duracionMinutos} min</span>
                </div>
                <div>
                  <span style={{ marginRight: '16px' }}>${s.precio}</span>
                  <button className="btn btn-secondary" onClick={() => { setBookingData({...bookingData, servicioId: s.id}); setStep(2); }}>Seleccionar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h3>Paso 2: Selecciona un Barbero</h3>
          <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            {barbers.map(b => (
              <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <span>{b.nombre}</span>
                <button className="btn btn-secondary" onClick={() => { setBookingData({...bookingData, barberoId: b.id}); setStep(3); }}>Seleccionar</button>
              </div>
            ))}
          </div>
          <button style={{marginTop: '16px'}} className="btn btn-secondary" onClick={() => setStep(1)}>Atrás</button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h3>Paso 3: Selecciona Fecha y Hora</h3>
          <div style={{ marginTop: '16px' }}>
            <input 
              type="datetime-local" 
              style={{ padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
              value={bookingData.fechaHora}
              onChange={e => setBookingData({...bookingData, fechaHora: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <button className="btn btn-secondary" onClick={() => setStep(2)}>Atrás</button>
            <button className="btn btn-primary" onClick={handleBooking}>Confirmar Reserva</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-primary)' }}>¡Cita Confirmada!</h3>
          <p style={{ marginTop: '16px' }}>Te esperamos en Kings Cut.</p>
          <button style={{marginTop: '24px'}} className="btn btn-secondary" onClick={() => window.location.href='/'}>Volver al inicio</button>
        </div>
      )}
    </div>
  );
};

export default BookingWizard;
