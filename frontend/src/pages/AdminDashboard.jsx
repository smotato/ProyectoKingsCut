import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ImageSlider from '../components/ImageSlider';
import { Pencil, Trash2, Download } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('citas');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  // Form states
  const [userForm, setUserForm] = useState({ id: null, nombre: '', correo: '', password: '', confirmPassword: '', telefono: '', rol: 'CLIENTE' });
  const [serviceForm, setServiceForm] = useState({ id: null, nombre: '', descripcion: '', duracionMinutos: 30, precio: 0, activo: true });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const appRes = await api.get('/appointments');
      setAppointments(appRes.data);
      const servRes = await api.get('/services');
      setServices(servRes.data);
      const usrRes = await api.get('/users');
      setUsers(usrRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadPDF = (data, filename, title, columns) => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: data,
    });
    doc.save(`${filename}.pdf`);
  };

  const downloadExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleDownloadPDF = () => {
    if (activeTab === 'citas') {
      const data = appointments.map(a => [a.id, new Date(a.fechaHora).toLocaleString(), a.cliente?.nombre || '', a.barbero?.nombre || '', a.servicio?.nombre || '', a.estado]);
      downloadPDF(data, 'reporte_citas', 'Reporte de Citas', ['ID', 'Fecha', 'Cliente', 'Barbero', 'Servicio', 'Estado']);
    } else if (activeTab === 'usuarios') {
      const data = users.map(u => [u.id, u.nombre, u.correo, u.rol]);
      downloadPDF(data, 'reporte_usuarios', 'Reporte de Usuarios', ['ID', 'Nombre', 'Correo', 'Rol']);
    } else if (activeTab === 'servicios') {
      const data = services.map(s => [s.id, s.nombre, s.precio, s.duracionMinutos, s.activo ? 'Activo' : 'Inactivo']);
      downloadPDF(data, 'reporte_servicios', 'Reporte de Servicios', ['ID', 'Nombre', 'Precio', 'Duracion (min)', 'Estado']);
    }
  };

  const handleDownloadExcel = () => {
    if (activeTab === 'citas') {
      const data = appointments.map(a => ({ ID: a.id, Fecha: new Date(a.fechaHora).toLocaleString(), Cliente: a.cliente?.nombre || '', Barbero: a.barbero?.nombre || '', Servicio: a.servicio?.nombre || '', Estado: a.estado }));
      downloadExcel(data, 'reporte_citas');
    } else if (activeTab === 'usuarios') {
      const data = users.map(u => ({ ID: u.id, Nombre: u.nombre, Correo: u.correo, Rol: u.rol }));
      downloadExcel(data, 'reporte_usuarios');
    } else if (activeTab === 'servicios') {
      const data = services.map(s => ({ ID: s.id, Nombre: s.nombre, Precio: s.precio, Duracion: s.duracionMinutos, Estado: s.activo ? 'Activo' : 'Inactivo' }));
      downloadExcel(data, 'reporte_servicios');
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      if (userForm.id) {
        await api.put(`/users/${userForm.id}`, userForm);
      } else {
        await api.post('/users', userForm);
      }
      setUserForm({ id: null, nombre: '', correo: '', password: '', confirmPassword: '', telefono: '', rol: 'CLIENTE' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await api.delete(`/users/${id}`);
      fetchData();
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (serviceForm.id) {
        await api.put(`/services/${serviceForm.id}`, serviceForm);
      } else {
        await api.post('/services', serviceForm);
      }
      setServiceForm({ id: null, nombre: '', descripcion: '', duracionMinutos: 30, precio: 0, activo: true });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este servicio?")) {
      await api.delete(`/services/${id}`);
      fetchData();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <ImageSlider />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--color-primary)' }}>Panel de Administración</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handleDownloadPDF} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Download size={16} /> PDF
          </button>
          <button className="btn btn-secondary" onClick={handleDownloadExcel} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <button className={activeTab === 'citas' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('citas')}>Citas</button>
        <button className={activeTab === 'usuarios' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('usuarios')}>Usuarios</button>
        <button className={activeTab === 'servicios' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setActiveTab('servicios')}>Servicios</button>
      </div>

      {activeTab === 'citas' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
            <div className="card">
              <h3 style={{ marginBottom: '16px' }}>Métricas Generales</h3>
              <p style={{ fontSize: '24px' }}>Total Citas: {appointments.length}</p>
              <p style={{ fontSize: '24px', color: 'var(--color-primary)', marginTop: '8px' }}>
                Completadas: {appointments.filter(a => a.estado === 'COMPLETADA').length}
              </p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: '16px' }}>Servicios Activos</h3>
              <p style={{ fontSize: '24px' }}>{services.length} Servicios</p>
            </div>
          </div>
          <div className="card" style={{ padding: '0', overflowX: 'auto', overflowY: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px' }}>ID</th>
                  <th style={{ padding: '16px' }}>Fecha</th>
                  <th style={{ padding: '16px' }}>Cliente</th>
                  <th style={{ padding: '16px' }}>Barbero</th>
                  <th style={{ padding: '16px' }}>Servicio</th>
                  <th style={{ padding: '16px' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px' }}>#{a.id}</td>
                    <td style={{ padding: '16px' }}>{new Date(a.fechaHora).toLocaleString()}</td>
                    <td style={{ padding: '16px' }}>{a.cliente?.nombre}</td>
                    <td style={{ padding: '16px' }}>{a.barbero?.nombre}</td>
                    <td style={{ padding: '16px' }}>{a.servicio?.nombre}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        backgroundColor: a.estado === 'PENDIENTE' ? '#C4913D' : a.estado === 'COMPLETADA' ? 'var(--color-primary)' : 'red',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {a.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'usuarios' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          <div className="card">
            <h3>{userForm.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <input type="text" placeholder="Nombre completo" value={userForm.nombre} onChange={e => setUserForm({ ...userForm, nombre: e.target.value })} required style={inputStyle} />
              <input type="email" placeholder="Correo (Username)" value={userForm.correo} onChange={e => setUserForm({ ...userForm, correo: e.target.value })} required style={inputStyle} />
              <input type="password" placeholder={userForm.id ? "Nueva Contraseña (opcional)" : "Contraseña"} value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} required={!userForm.id} style={inputStyle} />
              <input type="password" placeholder={userForm.id ? "Confirmar Contraseña (opcional)" : "Confirmar Contraseña"} value={userForm.confirmPassword} onChange={e => setUserForm({ ...userForm, confirmPassword: e.target.value })} required={!userForm.id} style={inputStyle} />
              <input type="text" placeholder="Teléfono" value={userForm.telefono} onChange={e => setUserForm({ ...userForm, telefono: e.target.value })} style={inputStyle} />
              <select value={userForm.rol} onChange={e => setUserForm({ ...userForm, rol: e.target.value })} style={inputStyle}>
                <option value="CLIENTE">Cliente</option>
                <option value="BARBERO">Barbero</option>
                <option value="ADMIN">Administrador</option>
              </select>
              <button type="submit" className="btn btn-primary">{userForm.id ? 'Guardar Cambios' : 'Crear Usuario'}</button>
              {userForm.id && <button type="button" className="btn btn-secondary" onClick={() => setUserForm({ id: null, nombre: '', correo: '', password: '', confirmPassword: '', telefono: '', rol: 'CLIENTE' })}>Cancelar</button>}
            </form>
          </div>
          <div className="card" style={{ padding: '0', overflowX: 'auto', overflowY: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px' }}>ID</th>
                  <th style={{ padding: '16px' }}>Nombre</th>
                  <th style={{ padding: '16px' }}>Correo</th>
                  <th style={{ padding: '16px' }}>Rol</th>
                  <th style={{ padding: '16px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px' }}>#{u.id}</td>
                    <td style={{ padding: '16px' }}>{u.nombre}</td>
                    <td style={{ padding: '16px' }}>{u.correo}</td>
                    <td style={{ padding: '16px' }}>{u.rol}</td>
                    <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => setUserForm({ id: u.id, nombre: u.nombre, correo: u.correo, telefono: u.telefono, rol: u.rol, password: '', confirmPassword: '' })}>
                        <Pencil />
                      </button>
                      <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: 'red', borderColor: 'red' }} onClick={() => deleteUser(u.id)}>
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'servicios' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          <div className="card">
            <h3>{serviceForm.id ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
            <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <input type="text" placeholder="Nombre del servicio" value={serviceForm.nombre} onChange={e => setServiceForm({ ...serviceForm, nombre: e.target.value })} required style={inputStyle} />
              <input type="text" placeholder="Descripción" value={serviceForm.descripcion} onChange={e => setServiceForm({ ...serviceForm, descripcion: e.target.value })} required style={inputStyle} />
              <input type="number" placeholder="Duración (Minutos)" value={serviceForm.duracionMinutos} onChange={e => setServiceForm({ ...serviceForm, duracionMinutos: Number(e.target.value) })} required style={inputStyle} />
              <input type="number" step="0.01" placeholder="Precio ($)" value={serviceForm.precio} onChange={e => setServiceForm({ ...serviceForm, precio: Number(e.target.value) })} required style={inputStyle} />
              <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="checkbox" checked={serviceForm.activo} onChange={e => setServiceForm({ ...serviceForm, activo: e.target.checked })} /> Activo
              </label>
              <button type="submit" className="btn btn-primary">{serviceForm.id ? 'Guardar Cambios' : 'Crear Servicio'}</button>
              {serviceForm.id && <button type="button" className="btn btn-secondary" onClick={() => setServiceForm({ id: null, nombre: '', descripcion: '', duracionMinutos: 30, precio: 0, activo: true })}>Cancelar</button>}
            </form>
          </div>
          <div className="card" style={{ padding: '0', overflowX: 'auto', overflowY: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px' }}>ID</th>
                  <th style={{ padding: '16px' }}>Nombre</th>
                  <th style={{ padding: '16px' }}>Precio</th>
                  <th style={{ padding: '16px' }}>Duración</th>
                  <th style={{ padding: '16px' }}>Estado</th>
                  <th style={{ padding: '16px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px' }}>#{s.id}</td>
                    <td style={{ padding: '16px' }}>{s.nombre}</td>
                    <td style={{ padding: '16px' }}>${s.precio}</td>
                    <td style={{ padding: '16px' }}>{s.duracionMinutos} min</td>
                    <td style={{ padding: '16px' }}>{s.activo ? 'Activo' : 'Inactivo'}</td>
                    <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => setServiceForm(s)}><Pencil /></button>
                      <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: 'red', borderColor: 'red' }} onClick={() => deleteService(s.id)}><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-background)',
  color: '#fff'
};

export default AdminDashboard;
