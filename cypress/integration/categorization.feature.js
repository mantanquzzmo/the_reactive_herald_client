describe("Visitor succesfully", () => {
  it("shown big canvas categorized", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:categorized_article_1.json",
      status: 200
    });

    cy.visit("/");
    cy.get("#3.item")
      .contains("Culture")
      .click();

    cy.get("#article-title").should("contain", "Title cat 4:1");
  });

  it("shown side articles categorized", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?category=3",
      response: "fixture:categorized_response.json",
      status: 200
    });

    cy.visit("/");
    cy.get("#3.item")
      .contains("Culture")
      .click();

    cy.get("#side-articles").should("contain", "Title cat 4:2");
  });

  it("can click and get new categorized show page", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/3",
      response: "fixture:categorized_article_3.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?category=3",
      response: "fixture:categorized_response.json",
      status: 200
    });
    cy.visit("/");
    cy.get("#3.item")
      .contains("Culture")
      .click();

    cy.get("#side-article-3").should("contain", "Title cat 4:3");
    cy.get("#side-article-3").within(() => {
      cy.get("a").click();
    });
    cy.get("#article-title").should("contain", "Title cat 4:3");
  });

  it("can click and get new categorized show page", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/1",
      response: "fixture:article_show.json",
      status: 200
    });
    cy.visit("/");
    cy.get("#return")
      .contains("The Herald")
      .click();

    cy.get("#article-title").should("contain", "Article 1");
    cy.get("#side-article-4").should("contain", "Test4");
  });
});
