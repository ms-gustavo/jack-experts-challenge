/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add("visitIndexPage", () => {
  cy.visit("/");
});

Cypress.Commands.add("renderLoginForm", () => {
  cy.get("#auth-container").within(() => {
    cy.get("#auth-text").should("contain.text", "Login no Task Manager");
    cy.get("#login-form")
      .should("exist")
      .within(() => {
        cy.get("label[for='email']").should("contain.text", "Email");
        cy.get("input[type='email']").should("exist");
        cy.get("label[for='password']").should("contain.text", "Senha");
        cy.get("input[type='password']").should("exist");
        cy.get("button[type='submit']").should("contain.text", "Login");
      });
    cy.get("#auth-toggle").should("contain.text", "Não tem conta? Registre-se");
  });
});

Cypress.Commands.add("changeForm", () => {
  cy.get("#auth-toggle").click();
});

Cypress.Commands.add("renderRegisterForm", () => {
  cy.changeForm();
  cy.get("#auth-container").within(() => {
    cy.get("#auth-text").should("contain.text", "Registre-se no Task Manager");
    cy.get("#register-form")
      .should("exist")
      .within(() => {
        cy.get("label[for='name']").should("contain.text", "Nome");
        cy.get("input[type='text']").should("exist");
        cy.get("label[for='email']").should("contain.text", "Email");
        cy.get("input[type='email']").should("exist");
        cy.get("label[for='password']").should("contain.text", "Senha");
        cy.get("input[type='password']").should("exist");
        cy.get("button[type='submit']").should("contain.text", "Registrar");
      });
  });
  cy.get("#auth-toggle").should("contain.text", "Já tem conta? Login");
});

Cypress.Commands.add("checkToast", (message: string) => {
  cy.get("div[role='status']").should("contain.text", message);
});

Cypress.Commands.add("registerNewUser", () => {
  cy.renderRegisterForm();
  cy.get("#register-form").within(() => {
    cy.get("input[type='text']").type("Test User");
    cy.get("input[type='email']").type("test@cypress.com");
    cy.get("input[type='password']").type("password");
  });
  cy.get("button[type='submit']").click();
});

Cypress.Commands.add("loginUser", () => {
  cy.renderLoginForm();
  cy.get("#login-form").within(() => {
    cy.get("input[type='email']").type("test@cypress.com");
    cy.get("input[type='password']").type("password");
  });
  cy.get("button[type='submit']").click();
});
