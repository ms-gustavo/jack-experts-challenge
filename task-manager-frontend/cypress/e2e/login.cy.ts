describe("Login user", () => {
  beforeEach(() => {
    cy.visitIndexPage();
  });

  it("should render validations errors", () => {
    cy.renderLoginForm();
    cy.get("#login-form").within(() => {
      cy.get("button[type='submit']").click();
    });
    cy.get("#login-email-input").within(() => {
      cy.get("p").should("contain.text", "Email inválido");
    });
    cy.get("#login-password-input").within(() => {
      cy.get("p").should(
        "contain.text",
        "Senha deve ter pelo menos 6 caracteres"
      );
    });
  });

  it("should render a toast error when invalid credentials", () => {
    cy.get("#login-form").within(() => {
      cy.get("input[type='email']").type("wrongemail@wrong.com");
      cy.get("input[type='password']").type("wrongpassword");
      cy.get("button[type='submit']").click();
    });
    cy.checkToast("Erro ao logar");
  });

  it("should login a user", () => {
    cy.loginUser();
    cy.checkToast("Login efetuado com sucesso");
    cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard/list-tasks`);
  });
});
