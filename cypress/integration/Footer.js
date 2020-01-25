/// <reference types="Cypress" />

describe("Footer displays", () => {
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

  });

  it("an event from the past", () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(1);
    cy.route({
      method: "GET",
      url: `https://byabbe.se/on-this-day/${mm}/${dd}/events.json`,
      response: "fixture:on_this_day.json"
    });
    cy.visit("/");
    cy.get("#footer-onthisday").should("contain", "Sri Lanka's Temple of the Tooth");
  });
});
