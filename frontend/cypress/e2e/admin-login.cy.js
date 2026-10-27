describe('Caso de Prueba 2: Autenticación de Administrador', () => {
  it('Debe permitir iniciar sesión como administrador exitosamente cumpliendo con los 10 pasos', () => {
    
    // Paso 1: Navegar a la página de inicio de sesión
    cy.visit('http://localhost:5173/login');

    // Paso 2: Validar que la URL de la página sea la esperada
    cy.url().should('include', '/login');

    // Paso 3: Validar que el título de la página sea el correcto (ajusta el texto si tu index.html tiene otro título)
    cy.title().should('not.be.empty');

    // Paso 4: Validar la presencia del input de correo electrónico (elemento presente y visible)
    cy.get('input[type="email"]')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Correo electrónico');

    // Paso 5: Validar la presencia del input de contraseña (elemento presente y visible)
    cy.get('input[type="password"]')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Contraseña');

    // Paso 6: Validar estilos CSS del botón de enviar (ejemplo: asegurando que el botón tenga display o propiedades de diseño)
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('have.css', 'display'); // Validación de estilo CSS requerido

    // Paso 7: Acción de tipo input - Escribir el correo del administrador
    cy.get('input[type="email"]').type('admin@kingscut.com');

    // Paso 8: Acción de tipo input - Escribir la contraseña del administrador
    cy.get('input[type="password"]').type('password');

    // Paso 9: Acción de tipo click - Enviar el formulario haciendo clic en el botón Entrar
    cy.get('button[type="submit"]').click();

    // Paso 10: Validar autenticación válida y redirección exitosa a la URL del dashboard de administrador
    cy.url().should('include', '/admin-dashboard');
  });
});