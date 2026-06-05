-- Usuarios
-- El hash $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HCGKKsvjzBMBbheq1w.uG equivale a la contraseña "password"
INSERT INTO users (nombre, correo, telefono, rol, password) VALUES ('Admin Principal', 'admin@kingscut.com', '5551234567', 'ADMIN', '$2a$10$DuY3M8EDAJgvPQTXvgVGm.3MUyV4YTEClrg99DGLDnLP6p6dbfzLq');
INSERT INTO users (nombre, correo, telefono, rol, password) VALUES ('Andres', 'andres.barber@kingscut.com', '5551112222', 'BARBERO', '$2a$10$DuY3M8EDAJgvPQTXvgVGm.3MUyV4YTEClrg99DGLDnLP6p6dbfzLq');
INSERT INTO users (nombre, correo, telefono, rol, password) VALUES ('Juan', 'juan.cliente@test.com', '5550000001', 'CLIENTE', '$2a$10$DuY3M8EDAJgvPQTXvgVGm.3MUyV4YTEClrg99DGLDnLP6p6dbfzLq');
INSERT INTO users (nombre, correo, telefono, rol, password) VALUES ('Maria', 'maria.cliente@test.com', '5550000002', 'CLIENTE', '$2a$10$DuY3M8EDAJgvPQTXvgVGm.3MUyV4YTEClrg99DGLDnLP6p6dbfzLq');

-- Servicios
INSERT INTO services (nombre, descripcion, duracion_minutos, precio, activo) VALUES ('Corte Clásico', 'Corte de cabello tradicional con tijera o máquina', 30, 15.00, true);
INSERT INTO services (nombre, descripcion, duracion_minutos, precio, activo) VALUES ('Corte Fade', 'Corte degradado moderno', 45, 20.00, true);
INSERT INTO services (nombre, descripcion, duracion_minutos, precio, activo) VALUES ('Arreglo de Barba', 'Perfilado y recorte de barba con toalla caliente', 30, 12.00, true);

-- Citas (ejemplos)
INSERT INTO appointments (cliente_id, barbero_id, servicio_id, fecha_hora, estado) VALUES (3, 2, 1, '2026-06-05T10:00:00', 'PENDIENTE');
INSERT INTO appointments (cliente_id, barbero_id, servicio_id, fecha_hora, estado) VALUES (4, 2, 2, '2026-06-05T11:00:00', 'PENDIENTE');
