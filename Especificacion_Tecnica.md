# Especificación Técnica: Kings Cut Appointment Manager

## 1. Resumen y Tecnologías a Utilizar

Basado en el Product Requirements Document (PRD) y los mockups proporcionados (Reserva de Cita, Design System, Panel del Barbero, Landing Reservas, Admin Dashboard), esta especificación define la arquitectura y los lineamientos técnicos para el desarrollo de la plataforma web de gestión de citas de Kings Cut.

### Stack Tecnológico:
*   **Backend:** Java con **Spring Boot** (proporcionando una API REST).
*   **Frontend:** **ReactJS** (desarrollado con Vite o Create React App, se sugiere Vite para mejor rendimiento).
*   **Base de Datos:** **H2 In-Memory Database** (para desarrollo inicial rápido y pruebas).
*   **Estilos:** CSS puro / Design System basado en los mockups HTML (`kings_cut_design_system`).
*   **Autenticación:** *Ninguna por el momento* (acceso directo o selección de rol temporal mediante interfaz para simular el comportamiento en el MVP).

---

## 2. Arquitectura del Sistema

La solución seguirá un modelo **Cliente-Servidor**:
*   **Frontend (Cliente):** Una Single Page Application (SPA) construida en ReactJS que consumirá los endpoints del backend. Manejará el enrutamiento con `react-router-dom` y el estado de la UI.
*   **Backend (Servidor):** Una aplicación Spring Boot estructurada en capas (Controladores, Servicios, Repositorios, Entidades). Expondrá endpoints RESTful en formato JSON.
*   **Capa de Datos:** Base de datos relacional en memoria (H2). Se configurará Spring Data JPA para el mapeo objeto-relacional (ORM) usando Hibernate.

---

## 3. Modelo de Datos (Base de Datos H2)

Se definirán las siguientes entidades principales (Tablas):

1.  **User (Usuario):** Aunque no hay autenticación, se almacenarán los datos base para distinguir roles.
    *   `id` (PK), `nombre`, `correo`, `telefono`, `rol` (CLIENTE, BARBERO, ADMIN).
2.  **Service (Servicio):**
    *   `id` (PK), `nombre`, `descripcion`, `duracion_minutos`, `precio`, `activo`.
3.  **Appointment (Cita):**
    *   `id` (PK), `cliente_id` (FK), `barbero_id` (FK), `servicio_id` (FK), `fecha_hora`, `estado` (PENDIENTE, COMPLETADA, CANCELADA).

### Semilla de Datos (Data Seeder)
Para cumplir con el requerimiento de **20 datos de prueba**, se utilizará un archivo `data.sql` en la carpeta `src/main/resources` de Spring Boot, o un `CommandLineRunner`. Esto inicializará la base de datos H2 cada vez que se levante el servidor con:
*   2 Administradores.
*   4 Barberos.
*   8 Servicios.
*   10 Clientes.
*   20 Citas de prueba (distribuidas en diferentes estados y fechas).

---

## 4. Diseño del Backend (Spring Boot)

### 4.1. Estructura de Paquetes
*   `com.kingscut.api.controllers` (Endpoints REST)
*   `com.kingscut.api.services` (Lógica de negocio)
*   `com.kingscut.api.repositories` (Interfaces Spring Data JPA)
*   `com.kingscut.api.models` (Entidades JPA)
*   `com.kingscut.api.dto` (Data Transfer Objects para peticiones y respuestas)

### 4.2. Endpoints Principales (API REST)

**Servicios (`/api/services`)**
*   `GET /api/services` - Listar servicios activos.
*   `POST /api/services` - Crear servicio (Admin).

**Barberos (`/api/barbers`)**
*   `GET /api/barbers` - Listar barberos disponibles.

**Citas (`/api/appointments`)**
*   `GET /api/appointments` - Listar todas las citas (Admin).
*   `GET /api/appointments/barber/{id}` - Listar citas de un barbero.
*   `GET /api/appointments/client/{id}` - Listar citas de un cliente.
*   `POST /api/appointments` - Crear una nueva reserva (F-03).
*   `PUT /api/appointments/{id}/status` - Cambiar estado de la cita (Cancelar/Completar) (F-05).
*   `PUT /api/appointments/{id}/reschedule` - Reprogramar cita (F-04).

*Nota: Cors Configuration deberá habilitarse globalmente en Spring Boot para permitir peticiones desde ReactJS.*

---

## 5. Diseño del Frontend (ReactJS)

### 5.1. Estructura de la Aplicación
El UI se dividirá basado en los mockups definidos:
*   `kings_cut_landing_reservas`: Componente principal para clientes, visualización de landing page y flujo inicial.
*   `reserva_de_cita`: Wizard o formulario por pasos para completar la selección de (Servicio -> Barbero -> Fecha/Hora -> Confirmación).
*   `panel_del_barbero_agenda`: Vista específica para que el barbero vea sus citas del día y las marque como completadas.
*   `administracion_dashboard_general`: Panel para que el administrador visualice todas las citas y métricas globales.
*   `kings_cut_design_system`: Los estilos globales, variables de color, tipografía y componentes base (botones, inputs, tarjetas) se extraerán de esta carpeta y se implementarán como módulos CSS o componentes reutilizables en React.

### 5.2. Componentes Clave
*   **Router:** Uso de `react-router-dom` para manejar las rutas `/` (Landing), `/booking` (Reserva), `/barber-dashboard` (Panel Barbero), `/admin-dashboard` (Panel Admin).
*   **Gestión de Estado:** Al ser un MVP sin autenticación real, se puede usar `Context API` o simplemente estado local (`useState`, `useEffect`) para almacenar temporalmente la selección del usuario ("¿Quién soy ahora?" -> Cliente, Barbero o Admin) y probar los diferentes flujos.
*   **Peticiones HTTP:** Se utilizará `axios` o `fetch` para conectar con el backend de Spring Boot (ej. `http://localhost:8080/api/...`).

---

## 6. Siguientes Pasos (Plan de Ejecución)

1.  **Fase Backend:** 
    *   Generar proyecto Spring Boot (Web, JPA, H2).
    *   Crear Entidades y Repositorios.
    *   Desarrollar Endpoints REST básicos.
    *   Poblar DB H2 con 20 registros iniciales.
2.  **Fase Frontend:**
    *   Crear proyecto React (Vite).
    *   Traducir mockups HTML/CSS (Design System) a componentes React.
    *   Configurar rutas e integrar vistas (Landing, Reserva, Paneles).
3.  **Fase de Integración:**
    *   Conectar el Frontend React con el Backend Spring Boot y validar flujos (Listar servicios, agendar cita, ver panel de barbero).
