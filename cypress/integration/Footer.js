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
    cy.get("#footer-onthisday").should(
      "contain",
      "Sri Lanka's Temple of the Tooth"
    );
  });

  it("todays financials", () => {
    cy.route({
      method: "GET",
      url: `https://api.worldtradingdata.com/api/v1/forex`,
      response: "fixture:wtd.json"
    });
    cy.visit("/");
    cy.get("#footer-financials").should("contain", "Bitcoin: 8333 $");
  });

  it("newspaper info", () => {
    cy.visit("/");
    cy.get("#footer-info").should("contain", "CEO and Editor in chief:");
  });
});
