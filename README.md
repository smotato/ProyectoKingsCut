# Kings Cut - Sistema de Barbería 💈

Kings Cut es un sistema integral de reservas y gestión para una barbería, que permite a los clientes agendar citas, a los barberos gestionar sus agendas, y a los administradores administrar usuarios, servicios y tener una visión general del negocio.

---

## 🏗️ 1. Estructura y Arquitectura del Proyecto

El proyecto está separado en dos ecosistemas principales: un **Backend (API RESTful)** y un **Frontend (Single Page Application)**.

### Organización de Carpetas
```
KingsCutProject/
├── backend/            # Backend desarrollado en Java (Spring Boot)
│   ├── src/main/java/com/kingscut/api/
│   │   ├── config/       # Configuraciones (Seguridad, CORS)
│   │   ├── controllers/  # Puntos de entrada HTTP (Endpoints)
│   │   ├── models/       # Entidades mapeadas a la base de datos (JPA/Hibernate)
│   │   └── repositories/ # Interfaces que se conectan a la DB mediante Spring Data JPA
│   └── src/main/resources/
│       └── application.properties # Configuración de DB, puerto y parámetros del sistema
│
└── frontend/           # Frontend desarrollado en ReactJS + Vite
    ├── src/
    │   ├── components/   # Componentes reutilizables (Navbar, Footer, ImageSlider, etc.)
    │   ├── context/      # Estados globales (ej. AuthContext para manejar sesión)
    │   ├── pages/        # Vistas principales (Dashboards, Login, Register, Profile, etc.)
    │   └── services/     # Llamadas al API a través de Axios (`api.js`)
    ├── package.json      # Dependencias NPM
    └── vite.config.js    # Configuración del servidor de desarrollo Vite
```

### Arquitectura Utilizada
- **Backend (MVC orientado a Recursos):** 
  - **Controllers:** Exponen la API REST (GET, POST, PUT, DELETE). Reciben la petición HTTP y envían respuestas en formato JSON.
  - **Repositories (Data Access Layer):** Usan Spring Data JPA para realizar el CRUD y abstracciones sobre la base de datos sin escribir SQL manualmente.
  - **Models (Entities):** Son los objetos del dominio de negocio (Usuario, Cita, Servicio) que son mapeados automáticamente a las tablas de la BD mediante *Hibernate*.
  - **Seguridad:** Uso de `BCryptPasswordEncoder` para encriptar contraseñas y un filtro de seguridad configurado.
- **Frontend (Arquitectura basada en Componentes):**
  - Desarrollado en React JS estructurando la lógica de enrutamiento con `React Router`.
  - Uso de un patrón de **State Management** mediante Context API (`AuthContext`) que administra globalmente qué usuario está logueado en memoria local (`localStorage`).
  - Las pantallas están protegidas por el componente `ProtectedRoute`, realizando un bloqueo seguro (basado en Roles) desde el cliente.

---

## 🚀 2. Guía de Ejecución del Aplicativo

### Requisitos Previos
- **Java 17** o superior.
- **Node.js** (v16+) y **npm**.

### Paso 1: Configurar e iniciar el Backend
1. Abre una terminal y dirígete a la carpeta del backend:
   ```bash
   cd KingsCutProject/backend
   ```
2. **(Configuración):** Verifica el archivo `backend/src/main/resources/application.properties`. Por defecto el servidor correrá en el puerto `8080`. No necesitas configurar contraseñas externas ya que usa la base de datos en memoria **H2**.
3. **Compilar y Ejecutar:** 
   En Windows (PowerShell/CMD):
   ```bash
   .\gradlew.bat bootRun
   ```
   En macOS/Linux:
   ```bash
   ./gradlew bootRun
   ```
4. Verás en la consola de Spring Boot que el backend se ha iniciado con éxito. Déjalo corriendo.

### Paso 2: Instalar y arrancar el Frontend
1. Abre una **nueva** terminal y dirígete a la carpeta del frontend:
   ```bash
   cd KingsCutProject/frontend
   ```
2. Instala las dependencias (necesario solo la primera vez):
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. La aplicación te mostrará un enlace. Abre en tu navegador **`http://localhost:5173`**.

---

## 🗄️ 3. Acceso a la base de datos H2

El backend utiliza **H2**, una base de datos ligera que vive en la memoria RAM y se recrea en cada ejecución (gracias a `spring.jpa.hibernate.ddl-auto=create-drop`). 

### ¿Cómo acceder a la Consola de H2?
Mientras el backend esté corriendo, la consola de la base de datos estará disponible gráficamente mediante una página web.

1. Abre en tu navegador la URL: 
   👉 **http://localhost:8080/h2-console**
2. Llena el formulario de login exactamente con estos datos (establecidos en `application.properties`):
   - **Driver Class:** `org.h2.Driver`
   - **JDBC URL:** `jdbc:h2:mem:kingscutdb`
   - **User Name:** `sa`
   - **Password:** `password`
3. Haz clic en el botón **Connect**.

### Ejemplo de cómo consultar las tablas creadas
Una vez dentro de la consola web de H2, verás las tablas en el panel izquierdo (por ejemplo: `USERS`, `SERVICES`, `APPOINTMENTS`).

Para ejecutar una consulta manualmente, usa el panel de texto principal, escribe código SQL puro y dale clic a **Run (Ejecutar)**:

**Consultar todos los usuarios y sus contraseñas encriptadas:**
```sql
SELECT * FROM users;
```

**Consultar citas con estado PENDIENTE:**
```sql
SELECT * FROM appointments WHERE estado = 'PENDIENTE';
```

**Consultar los servicios disponibles:**
```sql
SELECT id, nombre, precio FROM services WHERE activo = true;
```

---

## 👥 4. Usuarios Registrados Inicialmente

Si presentas problemas para acceder a la base de datos debido a que “El localhost rechazó la conexión del sitio”, a continuación se detalla el listado de usuarios iniciales disponibles para probar la aplicación. 

Todos los usuarios utilizan la contraseña: **`password`**

| Nombre | Rol | Correo |
| :--- | :--- | :--- |
| Admin Principal | Administrador | `admin@kingscut.com` |
| Andres | Barbero | `andres.barber@kingscut.com` |
| Juan | Cliente | `juan.cliente@test.com` |
| Maria | Cliente | `maria.cliente@test.com` |
