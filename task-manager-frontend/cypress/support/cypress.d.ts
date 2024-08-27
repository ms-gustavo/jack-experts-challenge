/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    visitIndexPage(): Chainable<Subject>;
    changeForm(): Chainable<Subject>;
    renderLoginForm(): Chainable<Subject>;
    renderRegisterForm(): Chainable<Subject>;
    registerNewUser(): Chainable<Subject>;
    checkToast(message: string): Chainable<Subject>;
    loginUser(): Chainable<Subject>;
  }
}
