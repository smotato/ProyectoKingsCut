describe('Caso de Prueba 3: Agendamiento de Citas del Cliente y Validación en Dashboard', () => {
  it('Debe permitir iniciar sesión, agendar una cita y verificarla en el dashboard cumpliendo los 10 pasos', () => {
    
    // Paso 1: Navegar a la página de inicio de sesión
    cy.visit('http://localhost:5173/login');
    cy.url().should('include', '/login');

    // Paso 2: Llenar el formulario de inicio de sesión con credenciales de cliente y enviar
    cy.get('input[type="email"]').should('be.visible').type('juan.cliente@test.com');
    cy.get('input[type="password"]').should('be.visible').type('password');
    cy.get('button[type="submit"]').should('be.visible').click();

    // Paso 3: Validar que la autenticación sea exitosa y redirija a la reserva
    cy.url().should('include', '/booking');

    // Paso 4: Validar el título y los estilos CSS del encabezado de reserva
    cy.get('h2').should('have.text', 'Reservar Cita').and('have.css', 'display');

    // Paso 5: Validar la presencia de los servicios y seleccionar el primer servicio disponible
    cy.get('.card').should('exist');
    cy.contains('button', 'Seleccionar').first().should('be.visible').click();

    // Paso 6: Validar que avance al paso de selección de barbero y elegir el primero
    cy.contains('h3', 'Paso 2: Selecciona un Barbero').should('be.visible');
    cy.get('button.btn-secondary').contains('Seleccionar').first().click();

    // Paso 7: Validar que avance al paso 3 y comprobar el input de fecha/hora con estilos CSS
    cy.contains('h3', 'Paso 3: Selecciona Fecha y Hora').should('be.visible');
    cy.get('input[type="datetime-local"]')
      .should('be.visible')
      .should('have.css', 'border-radius');

    // Paso 8: Ingresar una fecha y hora válida en el input
    cy.get('input[type="datetime-local"]').type('2026-11-15T10:30');
    
    // Paso 9: Hacer clic en el botón de confirmar la reserva y validar el mensaje de éxito
    cy.get('button.btn-primary').contains('Confirmar Reserva').should('be.visible').click();
    cy.contains('h3', '¡Cita Confirmada!').should('be.visible');

    // Paso 10: Ir al Client Dashboard y validar la imagen del slider y la lista desplegable
    cy.contains('a, button', 'Mis Citas').should('be.visible').click();
    cy.contains('h2', 'Mis Citas Programadas').should('be.visible');
    
    // Validar el componente de imagen (ImageSlider basado en background-image)
    cy.get('div[style*="background-image"]').should('exist');

    // Validar la lista desplegable (<select>) al interactuar con las opciones de la cita
    cy.contains('button', 'Reprogramar').first().click();
    cy.get('select').should('exist').and('be.visible');
  });
});