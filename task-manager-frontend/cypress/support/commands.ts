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

Cypress.Commands.add("getNavBar", () => {
  cy.get("#navbar")
    .should("exist")
    .within(() => {
      cy.get("#welcome-text").should("contain.text", "Bem-vindo");
      cy.get("#user-actions-button").should("exist").click();
    });
});

Cypress.Commands.add("renderDashboard", () => {
  cy.getNavBar();
  cy.get("#create-task-button").should("contain.text", "Cadastrar Tarefa");
  cy.get("#list-tasks-button").should("contain.text", "Listar Tarefas");
  cy.get("#logout-button").should("contain.text", "Sair");
  cy.get("#no-tasks-available").should(
    "contain.text",
    "Nenhuma tarefa disponível"
  );
});

Cypress.Commands.add("checkCreateTaskValidationError", () => {
  cy.renderCreateTaskForm();
  cy.get("#create-task-button").click();
  cy.get("#create-task-title-input").within(() => {
    cy.get("p").should("have.class", "text-red-500");
  });
  cy.get("#create-task-description-input").within(() => {
    cy.get("p").should("have.class", "text-red-500");
  });
});

Cypress.Commands.add("createNewTask", (title: string, description: string) => {
  cy.get("#create-task-container")
    .should("exist")
    .within(() => {
      cy.get("#create-task-header").should("contain.text", "Criar Nova Tarefa");
      cy.get("#create-task-form").within(() => {
        cy.get("#create-task-title-input").within(() => {
          cy.get("#title").type(title, { force: true });
        });
        cy.get("#create-task-description-input").within(() => {
          cy.get("#description").type(description, { force: true });
        });
        cy.get("#create-task-button").click();
      });
    });
});

Cypress.Commands.add("renderCreateTaskForm", () => {
  cy.getNavBar();
  cy.get("#create-task-button")
    .should("contain.text", "Cadastrar Tarefa")
    .click();
});

Cypress.Commands.add("renderDashboardWithTasks", (description: string) => {
  cy.getNavBar();
  cy.get("#create-task-button").should("contain.text", "Cadastrar Tarefa");
  cy.get("#list-tasks-button").should("contain.text", "Listar Tarefas");
  cy.get("#logout-button").should("contain.text", "Sair");
  cy.get("#dashboard-with-task-container")
    .should("exist")
    .within(() => {
      cy.get("#dashboard-with-task-header").should("contain.text", "Tarefas");
      cy.get("#dashboard-with-task-text").should("contain.text", "Você tem");
    });
  cy.get("#pagination-container").should("exist");
  cy.get("#tasks-container").should("exist");
  cy.get("div[data-value^='task-expand-']").should("exist");
  cy.get('button[data-value^="task-complete-"]').should("exist");
  cy.get('span[data-value^="task-uncompleted-"]').should("exist");
  cy.get('button[data-value^="task-edit-pencil-"]').should("exist");
  cy.get('button[data-value^="task-delete-x-"]').should("exist");
  cy.get('h3[data-value^="task-title-"]').should("contain.text", "Test Task");
  cy.get('p[data-value^="task-description-"]').should(
    "contain.text",
    description
  );
});

Cypress.Commands.add("completeTask", () => {
  cy.get('button[data-value^="task-complete-"]').first().click({ force: true });
  cy.get('span[data-value^="task-uncompleted-"]').should(
    "have.class",
    "bg-green-500"
  );
});

Cypress.Commands.add("editTask", () => {
  cy.get('button[data-value^="task-edit-pencil-"]')
    .first()
    .click({ force: true });
  cy.get('input[type="text"]').type(" Edited", { force: true });
  cy.get("textarea").clear().type("Edited", { force: true });
  cy.get('button[data-value^="task-save-"]').click({ force: true });
  cy.get('h3[data-value^="task-title-"]').should(
    "contain.text",
    "Test Task Edited"
  );
});

Cypress.Commands.add("removeTask", () => {
  cy.get('button[data-value^="task-delete-x-"]').first().click({ force: true });
  cy.checkToast("Tarefa deletada com sucesso");
});

Cypress.Commands.add("logout", () => {
  cy.getNavBar();
  cy.get("#logout-button").click({ force: true });
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});
