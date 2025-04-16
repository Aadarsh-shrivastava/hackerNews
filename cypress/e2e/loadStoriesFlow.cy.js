describe('News Feed App', () => {
  it('loads 10 stories by default and loads more on button click', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="loading-indicator"]').should('be.visible');

    cy.get('[data-testid^="news-card"]').should('have.length', 5);

    cy.get('[data-testid="loading-indicator"]').should('not.exist');

    cy.contains('Load More').click();

    cy.get('[data-testid^="news-card"]').should('have.length', 10);
  });

  it('opens story link in new tab', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid^="news-card"]').first().should('have.attr', 'href').then((href) => {
      expect(href).to.include('http');

      cy.request(href).its('status').should('eq', 200); // ensure the link works
    });
  });

  it('displays error when going to wrong url', () => {
    cy.visit('http://localhost:5173/#/trending');

    cy.contains('The page you are looking for does not exist. Please go back to the homepage.').should('be.visible')
  });
});
