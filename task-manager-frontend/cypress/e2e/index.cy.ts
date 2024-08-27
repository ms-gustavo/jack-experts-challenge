describe("Render index page", () => {
  beforeEach(() => {
    cy.visitIndexPage();
  });

  it("should render login form", () => {
    cy.renderLoginForm();
  });

  it("should render register form", () => {
    cy.renderRegisterForm();
  });
});
