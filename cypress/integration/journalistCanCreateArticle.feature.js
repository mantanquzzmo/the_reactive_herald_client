/// <reference types="Cypress" />

describe("Journalist attempts to create an article", () => {
  beforeEach(() => {
    cy.journalistLogin("admin");
  });

  it("successfully with title, body, category and image", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/articles",
      response: {},
      status: 200
    });
    cy.get("#article-form").within(() => {
      cy.get("#title").type("This is a news article");
      cy.get("#body").type("Scourge of the seven seas rutters Pieces of Eight sutler spyglass swab strike colors" +
                            "gangway swing the lead bilged on her anchor.");
      cy.get("#selector").first().click();
      cy.get("#selector > .visible > :nth-child(2)").click()

      cy.fixture('ca_basic_logo_320x40.png', 'base64').then(fileContent => {
        cy.get('#image-upload').upload(
          { fileContent, fileName: 'ca_basic_logo_320x40.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
      });
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should("contain", "Your article was successfully submitted for review.");
    cy.get("#image-preview").find("img").should("have.attr", "src").should("include", "VBORw0KGgoAAAANSUhE")
  });

  it("unsuccessfully without title", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/articles",
      status: "422",
      response: {
        errors: ["Your article must have a title and content."]
      }
    });
    cy.get("#article-form").within(() => {
      cy.get("#body").type(
        "Scourge of the seven seas rutters Pieces of Eight"
      );
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should(
      "contain",
      "Your article must have a title and content."
    );
  });

  it("unsuccessfully without body", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/articles",
      status: "422",
      response: {
        errors: ["Your article must have a title and content."]
      }
    });
    cy.get("#article-form").within(() => {
      cy.get("#title").type("This is a news article");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#create-article-message").should(
      "contain",
      "Your article must have a title and content."
    );
  });

  it("succesfully categorizes article", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/admin/articles",
      response: {},
      status: 200
    });
    cy.get("#article-form").within(() => {
      cy.get("#title").type("This is a news article");
      cy.get("#body").type("Scourge of the seven seas rutters Pieces of Eight");
      cy.get("#selector").first().click();
      cy.get("#selector > .visible > :nth-child(2)").click()

      cy.fixture('ca_basic_logo_320x40.png', 'base64').then(fileContent => {
        cy.get('#image-upload').upload(
          { fileContent, fileName: 'ca_basic_logo_320x40.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
      });
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.visit("/");
  });
});
