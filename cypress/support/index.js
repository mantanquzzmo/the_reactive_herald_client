import './commands'

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
})