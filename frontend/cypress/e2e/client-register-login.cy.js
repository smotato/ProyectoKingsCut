describe('Caso de Prueba 1: Registro de Cliente y Validación de Inicio de Sesión', () => {
  it('Debe registrar un nuevo cliente exitosamente, validar su redirección y comprobar su inicio de sesión', () => {
    
    // Generar un correo aleatorio para evitar conflictos si la prueba se ejecuta varias veces
    const randomEmail = `test.cliente.${Date.now()}@test.com`;

    // Paso 1: Navegar a la página de registro de clientes
    cy.visit('http://localhost:5173/register');

    // Paso 2: Validar la URL de la página de registro
    cy.url().should('include', '/register');

    // Paso 3: Validar el título de la página web
    cy.title().should('not.be.empty');

    // Paso 4: Validar la presencia de los inputs del formulario de registro y sus etiquetas (Elementos presentes)
    cy.contains('label', 'Nombre Completo').should('be.visible');
    cy.get('input[type="text"]').first().should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('have.length.at.least', 2); // Valida los campos de contraseña

    // Paso 5: Validar estilos CSS del botón de registro (ej. display o margenes)
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('have.css', 'margin-top', '16px');

    // Paso 6: Llenar el formulario de registro con los datos del nuevo cliente (Acciones de tipo)
    cy.get('input[type="text"]').first().type('Cliente de Prueba Cypress');
    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="text"]').eq(1).type('3001234567'); // Teléfono
    cy.get('input[type="password"]').first().type('Password123*');
    cy.get('input[type="password"]').eq(1).type('Password123*'); // Confirmar contraseña

    // Paso 7: Hacer clic en el botón Registrarse y confirmar el registro exitoso (Acción y aserción de elementos)
    cy.get('button[type="submit"]').click();

    // Paso 8: Validar que tras el registro exitoso redirige automáticamente a la página de inicio de sesión (/login)
    cy.url().should('include', '/login');

    // Paso 9: Iniciar sesión con el cliente recién registrado para validar la autenticación válida (Acciones y aserciones)
    cy.get('input[type="email"]').should('be.visible').type(randomEmail);
    cy.get('input[type="password"]').should('be.visible').type('Password123*');
    cy.get('button[type="submit"]').click();

    // Paso 10: Validar que el inicio de sesión fue exitoso verificando la redirección al dashboard o booking del cliente
    cy.url().should('satisfy', (url) => url.includes('/booking') || url.includes('/dashboard') || url.endsWith('/'));
  });
});