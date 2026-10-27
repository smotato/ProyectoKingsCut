describe('Caso de Prueba: Cancelación de Cita por parte del Cliente', () => {
  it('Debe iniciar sesión como cliente, ubicar una cita pendiente, cancelarla y validar su cambio de estado', () => {
    
    // Paso 1: Navegar a la página de inicio de sesión
    cy.visit('http://localhost:5173/login');
    cy.url().should('include', '/login');

    // Paso 2: Validar el título de la página web
    cy.title().should('not.be.empty');

    // Paso 3: Validar la presencia de los inputs del formulario de login (Elementos presentes)
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

    // Paso 4: Validar estilos CSS del botón de iniciar sesión
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('have.css', 'display');

    // Paso 5: Escribir las credenciales del cliente y enviar el formulario (Acciones de tipo y click)
    cy.get('input[type="email"]').type('juan.cliente@test.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();

    // Paso 6: Validar que la autenticación fue exitosa y redirigió al sistema
    cy.url().should('satisfy', (url) => url.includes('/booking') || url.includes('/dashboard') || url.endsWith('/'));

    // Paso 7: Navegar a la vista de Mis Citas haciendo clic en el menú superior (mantiene la sesión activa)
    cy.contains('a, button', 'Mis Citas').should('be.visible').click();
    cy.contains('h2', 'Mis Citas Programadas').should('be.visible');

    // Paso 8: Manejar la ventana emergente de confirmación (window.confirm) que lanza el código al cancelar
    cy.on('window:confirm', () => true);

    // Paso 9: Hacer clic en el botón "Cancelar Cita" de la primera cita pendiente disponible (Acción)
    cy.get('button').contains('Cancelar Cita').first().should('be.visible').click();

    // Paso 10: Validar que el estado de la cita cambie visualmente a 'CANCELADA' en pantalla (Aserción de texto y elementos)
    cy.contains('strong', 'CANCELADA').should('be.visible');
  });
});