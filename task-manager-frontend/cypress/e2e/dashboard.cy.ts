describe("Dashboard", () => {
  beforeEach(() => {
    cy.visitIndexPage();
    cy.loginUser();
    cy.checkToast("Login efetuado com sucesso");
    cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard/list-tasks`);
  });

  it("should render list tasks without tasks", () => {
    cy.renderDashboard();
  });

  it("should render create task form", () => {
    cy.renderCreateTaskForm();
  });

  it("should render validation errors", () => {
    cy.checkCreateTaskValidationError();
  });

  it("should create a new task", () => {
    cy.renderCreateTaskForm();
    cy.createNewTask("Test Task", "This is a test task");
    cy.checkToast("Atividade criada com sucesso");
  });

  it("should render dashboard with tasks", () => {
    cy.renderDashboardWithTasks("This is a test task");
  });

  it("should complete a task", () => {
    cy.renderDashboardWithTasks("This is a test task");
    cy.completeTask();
  });

  it("should edit an existing task", () => {
    cy.renderDashboardWithTasks("This is a test task");
    cy.editTask();
  });

  it("should delete an task", () => {
    cy.renderDashboardWithTasks("Edited");
    cy.removeTask();
  });

  it("should logout", () => {
    cy.logout();
  });
});
