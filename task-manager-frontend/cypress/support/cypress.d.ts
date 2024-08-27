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
    getNavBar(): Chainable<Subject>;
    renderDashboard(): Chainable<Subject>;
    renderCreateTaskForm(): Chainable<Subject>;
    createNewTask(title: string, description: string): Chainable<Subject>;
    checkCreateTaskValidationError(): Chainable<Subject>;
    renderDashboardWithTasks(description: string): Chainable<Subject>;
    completeTask(): Chainable<Subject>;
    editTask(): Chainable<Subject>;
    removeTask(): Chainable<Subject>;
    logout(): Chainable<Subject>;
  }
}
