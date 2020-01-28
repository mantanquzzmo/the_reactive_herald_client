Cypress.Commands.add("adminLogin", () => {
  cy.visit("/admin");
  cy.get("#login-button").click();
  cy.get("#login").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("button")
      .contains("Submit")
      .click();
  });
});

Cypress.Commands.add("journalistLogin", admin => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/auth/sign_in",
    response: "fixture:login_journalist.json"
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/auth/**",
    response: "fixture:login_journalist.json"
  });
  cy.visit(`/${admin}`);
  cy.get("#login-button").click();
  cy.get("#login").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("button")
      .contains("Submit")
      .click();
  });
});

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("#login-button").click();
  cy.get("#login").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("button")
      .contains("Submit")
      .click();
  });
});

Cypress.Commands.add("signup", () => {
  cy.visit("/");
  cy.get("#signup-button").click();
  cy.get("#signup").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("button")
      .contains("Sign Up")
      .click();
  });
});
