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
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/articles",
      response: "fixture:publish_article_flow/articleslist_before_publish.json"
    });
    cy.route({
      method: "PUT",
      url:
        "http://localhost:3000/api/v1/admin/articles/1?[article][published]=true",
      response: "fixture:publish_article_flow/articleslist_before_publish.json"
    });
    cy.visit("/admin");
    cy.get("#login-button").click();
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
      response: "fixture:publish_article_flow/articleslist_after_publish.json"
    });
    cy.get("#review-article-1").within(() => {
      cy.get("button")
        .contains("Publish")
        .click();
    });
    cy.get("#publish-header").should("contain", "You published article 1");
    cy.get("#unpublished-articles").not("contain", "Article 1");
  });

  it("can undo publishing article", () => {
    cy.route({
      method: "PUT",
      url:
        "http://localhost:3000/api/v1/admin/articles/1?[article][published]=false",
      response: "OK"
    });
    cy.get("#review-article-1").within(() => {
      cy.get("button")
        .contains("Publish")
        .click();
    });
    cy.get("#publish-header").within(() => {
      cy.get("button")
        .contains("Undo")
        .click();
    });
    cy.get("#publish-header").should(
      "contain",
      "Undid publishing of article 1"
    );
  });
});
