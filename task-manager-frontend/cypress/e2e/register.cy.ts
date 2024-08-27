describe("Register user", () => {
  beforeEach(() => {
    cy.visitIndexPage();
  });

  it("should render validations errors", () => {
    cy.renderRegisterForm();
    cy.get("#register-form").within(() => {
      cy.get("button[type='submit']").click();
    });
    cy.get("#name-input").within(() => {
      cy.get("p").should(
        "contain.text",
        "Nome deve ter pelo menos 2 caracteres"
      );
    });
    cy.get("#email-input").within(() => {
      cy.get("p").should("contain.text", "Email inválido");
    });
    cy.get("#password-input").within(() => {
      cy.get("p").should(
        "contain.text",
        "Senha deve ter pelo menos 6 caracteres"
      );
    });
  });

  it("should register user", () => {
    cy.registerNewUser();
    cy.checkToast("Cadastro realizado com sucesso");
    cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard/list-tasks`);
  });
  it("should render toast error when user is already registered", () => {
    cy.registerNewUser();
    cy.checkToast("Erro ao cadastrar");
  });
});
