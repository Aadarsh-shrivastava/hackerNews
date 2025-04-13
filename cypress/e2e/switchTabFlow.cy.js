describe('Switch Tab FLow', () => {
    it('loads new 10 stories by default on main page', () => {
        cy.intercept('GET', '**/v0/newstories.json').as('getStoryIds');
        cy.intercept('GET', '**/v0/item/*.json').as('getStories');

        cy.visit('http://localhost:5173/');

        cy.wait('@getStoryIds');

        cy.wait('@getStories');

        cy.get('[data-testid="loading-indicator"]').should('be.visible');

        cy.get('[data-testid^="news-card"]').should('have.length', 10);
    });

    it('loads top 10 stories when switched to top tab', () => {
        cy.intercept('GET', '**/v0/topstories.json').as('getTopStoryIds');
        cy.intercept('GET', '**/v0/item/*.json').as('getStories');

        cy.visit('http://localhost:5173/');

        cy.get('[data-testid="chip-Top"]').click();

        cy.wait('@getTopStoryIds');
        cy.wait('@getStories');

        cy.get('[data-testid="loading-indicator"]').should('be.visible');

        cy.get('[data-testid^="news-card"]').should('have.length', 10);

    });
});
