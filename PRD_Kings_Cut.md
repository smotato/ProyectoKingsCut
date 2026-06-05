# Product Requirements Document (PRD)
## Kings Cut Appointment Manager

### Versión
1.0

### Proyecto
Sistema Web de Gestión de Citas para la Barbería Kings Cut

---

# 1. Resumen Ejecutivo

## Problema

Actualmente Kings Cut gestiona las citas mediante WhatsApp, llamadas telefónicas y hojas de cálculo. Esto genera:

- Duplicidad de citas.
- Errores en horarios.
- Pérdida de información.
- Dependencia del administrador.
- Mala experiencia para los clientes.

## Solución

Desarrollar una plataforma web centralizada que permita gestionar clientes, citas, servicios, barberos y reportes mediante un sistema de roles con acceso controlado.

---

# 2. Objetivos del Producto

## Objetivos de Negocio

### OBJ-01
Reducir en un 90% los errores de agendamiento.

### OBJ-02
Disminuir el tiempo dedicado a la gestión manual de citas.

### OBJ-03
Aumentar la ocupación de los barberos.

### OBJ-04
Reducir ausencias mediante recordatorios automáticos.

### OBJ-05
Digitalizar completamente el proceso de reservas.

---

## Objetivos del Usuario

### Cliente

- Reservar citas fácilmente.
- Consultar disponibilidad en tiempo real.
- Cancelar o reprogramar citas.
- Recibir recordatorios.

### Barbero

- Consultar agenda diaria.
- Gestionar disponibilidad.
- Visualizar historial de atención.

### Administrador

- Gestionar clientes.
- Gestionar servicios.
- Gestionar barberos.
- Consultar reportes.
- Supervisar la operación.

---

# 3. Roles del Sistema

## Cliente

### Permisos

- Registrarse.
- Iniciar sesión.
- Consultar servicios.
- Consultar disponibilidad.
- Agendar citas.
- Reprogramar citas.
- Cancelar citas.
- Consultar historial.
- Editar perfil.

---

## Barbero

### Permisos

- Iniciar sesión.
- Consultar agenda.
- Gestionar horarios disponibles.
- Consultar información de clientes asignados.
- Marcar citas como completadas.
- Consultar historial de servicios realizados.

---

## Administrador

### Permisos

- Gestionar usuarios.
- Gestionar clientes.
- Gestionar barberos.
- Gestionar servicios.
- Gestionar agenda completa.
- Cancelar citas.
- Generar reportes.
- Configurar recordatorios.
- Consultar métricas del negocio.

---

# 4. User Personas

## Cliente Frecuente

**Nombre:** Juan

**Objetivo:** Reservar un corte en menos de dos minutos.

**Frustraciones:**

- Esperar respuesta por WhatsApp.
- No conocer disponibilidad.
- Olvidar citas.

---

## Barbero

**Nombre:** Andrés

**Objetivo:** Tener control de su agenda.

**Frustraciones:**

- Cambios de última hora.
- Horarios cruzados.
- Falta de visibilidad sobre sus citas.

---

## Administrador

**Nombre:** Carlos

**Objetivo:** Gestionar toda la barbería desde un único lugar.

**Frustraciones:**

- Información dispersa.
- Control manual.
- Errores de programación.

---

# 5. Alcance del MVP

## Gestión de Usuarios

- Registro de clientes.
- Inicio de sesión.
- Recuperación de contraseña.
- Gestión de perfiles.

## Gestión de Barberos

- Crear barbero.
- Editar barbero.
- Configurar horarios.

## Gestión de Servicios

- Crear servicio.
- Editar servicio.
- Desactivar servicio.

## Gestión de Citas

- Crear cita.
- Consultar disponibilidad.
- Cancelar cita.
- Reprogramar cita.

## Notificaciones

- Confirmación de cita.
- Cancelación.
- Recordatorio automático.

## Panel Administrativo

- Dashboard.
- Gestión de usuarios.
- Gestión de servicios.
- Gestión de citas.
- Reportes.

---

# 6. Funcionalidades Clave

## F-01 Registro de Clientes

El sistema permitirá registrar nuevos clientes mediante:

- Nombre.
- Correo.
- Teléfono.
- Contraseña.

### Criterios de aceptación

- No permitir correos duplicados.
- Validar campos obligatorios.

---

## F-02 Gestión de Disponibilidad

Los usuarios podrán consultar horarios disponibles en tiempo real.

### Criterios

- Mostrar únicamente horarios disponibles.
- Actualizar agenda automáticamente.

---

## F-03 Reserva de Cita

El cliente podrá seleccionar:

- Servicio.
- Barbero.
- Fecha.
- Hora.

### Resultado

La cita queda registrada y confirmada.

---

## F-04 Reprogramación de Cita

El cliente podrá modificar una cita existente.

### Restricción

No permitir cambios con menos de 2 horas de anticipación.

---

## F-05 Cancelación de Cita

El cliente o administrador podrá cancelar una reserva.

### Resultado

El horario vuelve a estar disponible.

---

## F-06 Agenda de Barbero

Cada barbero visualizará:

- Agenda diaria.
- Próximas citas.
- Historial de servicios.

---

## F-07 Notificaciones

Eventos:

- Cita creada.
- Cita modificada.
- Cita cancelada.
- Recordatorio previo.

---

## F-08 Reportes

El administrador podrá visualizar:

- Citas realizadas.
- Citas canceladas.
- Servicios más vendidos.
- Ingresos estimados.
- Barberos con mayor demanda.

---

# 7. Experiencia de Usuario

## Principios UX

### UX-01
Menos de tres pasos para reservar una cita.

### UX-02
Diseño responsive y mobile-first.

### UX-03
Disponibilidad visible antes del registro.

### UX-04
Confirmaciones claras después de cada acción.

### UX-05
Interfaz simple y enfocada en tareas rápidas.

---

# 8. Flujos Principales

## Flujo 1: Reserva de Cita

Landing Page
→ Ver Servicios
→ Seleccionar Servicio
→ Seleccionar Barbero
→ Seleccionar Fecha
→ Seleccionar Hora
→ Login o Registro
→ Confirmar Reserva
→ Notificación de Confirmación

---

## Flujo 2: Reprogramar Cita

Login
→ Mis Citas
→ Seleccionar Cita
→ Elegir Nueva Fecha
→ Confirmar
→ Notificación

---

## Flujo 3: Cancelar Cita

Login
→ Mis Citas
→ Seleccionar Cita
→ Cancelar
→ Confirmación

---

## Flujo 4: Gestión de Agenda del Barbero

Login Barbero
→ Agenda del Día
→ Ver Detalle
→ Marcar Servicio Completado

---

## Flujo 5: Administración

Login Administrador
→ Dashboard
→ Gestión de Usuarios
→ Gestión de Servicios
→ Gestión de Barberos
→ Gestión de Citas
→ Reportes

---

# 9. Métricas de Éxito

## Métricas de Negocio

- Número de citas por semana.
- Tasa de ocupación.
- Tasa de cancelación.
- Clientes recurrentes.

## Métricas de Producto

- Tiempo promedio para reservar.
- Usuarios registrados.
- Reservas completadas.
- Recordatorios enviados.
- Reprogramaciones realizadas.

---

# 10. Roadmap

## Fase 1 - MVP

- Registro.
- Login.
- Gestión de citas.
- Gestión de servicios.
- Gestión de barberos.
- Dashboard administrativo.

## Fase 2

- Reprogramación.
- Historial de clientes.
- Dashboard para barberos.
- Reportes avanzados.

## Fase 3

- Integración con WhatsApp.
- Pagos online.
- Programa de fidelización.
- Aplicación móvil.

---

# 11. Arquitectura de Roles

| Módulo | Cliente | Barbero | Administrador |
|---------|----------|----------|---------------|
| Registro | ✅ | ❌ | ❌ |
| Login | ✅ | ✅ | ✅ |
| Agendar cita | ✅ | ❌ | ✅ |
| Cancelar cita | ✅ | ❌ | ✅ |
| Reprogramar cita | ✅ | ❌ | ✅ |
| Ver agenda | Solo propias | Solo propias | Todas |
| Gestionar servicios | ❌ | ❌ | ✅ |
| Gestionar barberos | ❌ | ❌ | ✅ |
| Ver reportes | ❌ | ❌ | ✅ |
| Completar servicio | ❌ | ✅ | ✅ |

---

# 12. Visión del Producto

Convertir Kings Cut en una barbería digitalizada donde clientes, barberos y administradores interactúen mediante una plataforma moderna, eficiente y escalable que elimine los procesos manuales y mejore la experiencia de servicio.
