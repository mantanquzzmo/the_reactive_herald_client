describe("Editor can", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:article_show.json"
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login_publisher.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login_publisher.json"
    })
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/articles",
      response: "fixture:publisher_articles.json"
    });
    cy.route({
      method: "put",
      url: "http://localhost:3000/api/v1/admin/articles/1?published=true",
      response: "fixture:published_response.json"
    });
    cy.visit("/admin");
    cy.get("#loginButton").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
  });
  it("see a list of unpublished articles", () => {
    cy.get("#review-article-1").should("contain", "TestBody1");
  });

  it("can publish article", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/articles",
      response: "fixture:publisher_articles_after_publish.json"
    });
    cy.get("#review-article-1").within(() => {
      cy.get("button")
      .contains("Publish")
      .click();
    })
    cy.get("#publish-header").should("contain", "You published article 1:");
    cy.get("#unpublished-articles").not("contain", "Article 1");
  });

  it("can undo publishing article", () => {
    cy.route({
      method: "put",
      url: "http://localhost:3000/api/v1/admin/articles/1?published=false",
      response: "fixture:published_response.json"
    });
    cy.get("#review-article-1").within(() => {
      cy.get("button")
      .contains("Publish")
      .click();
    })
    cy.get("#publish-header").within(() => {
      cy.get("button")
      .contains("Undo")
      .click();
    })
    cy.get("#publish-header").should("contain", "Undid publishing of article 1:");
  });
});
