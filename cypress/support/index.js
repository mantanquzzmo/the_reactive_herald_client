import './commands'

beforeEach(() => {
  cy.server();
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/articles**",
    response: "fixture:side_articles_shown.json"
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/articles/**",
    response: "fixture:article_show.json"
  });

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(1);
  cy.route({
    method: "GET",
    url: `https://byabbe.se/on-this-day/${mm}/${dd}/events.json`,
    response: "fixture:on_this_day.json"
  });

  cy.route({
    method: "GET",
    url: `/api/v1/forex?base=USD&api_token=x50DVsx9yOqZCBXGZGrqMbBUlJeITZM2pY2vxhyqubikgYB4Db2UNZ0BxAnq`,
    response: "fixture:wtd.json"
  });
})