describe('Oompa dashboard', () => {
  beforeEach(() => {
    cy.intercept('worker.jpg', { fixture: "mock_image.jpg" })
    cy.intercept('GET', 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=1', {
      fixture: 'mockWorkersResponse.json',
    })
    cy.intercept('GET', 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=2', (req) => { 
      req.destroy();
    })
    cy.visit('/');
  })
  it('Contains correct headers text', () => {
    cy.get('[data-test="home-header"]').contains(/Find your Oompa Loompa/i);
    cy.get('[data-test="home-subheader"]').contains(/There are more than 100k/i);
  })
  it('Displays a list of workers fetched from API', () => {;
    cy.get('[data-test="worker-card"]').should('have.length', 6);
  })
  it('Worker cards contain the correct details', () => {
    cy.get('[data-test="worker-summary-name"]').first().should('contain', 'John Doe');
    cy.get('[data-test="worker-summary-gender"]').first().should('contain', 'M');
    cy.get('[data-test="worker-summary-profession"]').first().should('contain', 'Software Engineer');
  })
  it('Scrolling to the bottom of the page loads more workers', () => {
    cy.scrollTo('bottom', { duration: 2000 });
    cy.wait(1000);
    cy.get('[data-test="worker-card"]').its('length').should('eq', 31);
  })
  it('Clicking on a worker routes to that workers details', () => {
    cy.get('[data-test="worker-card"]').eq(2).click();
    cy.url().should('include', `/${3}`);
    cy.intercept('GET', 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/3', {
      fixture: 'mockWorkerResponse.json',
    })

    cy.get('[data-test="worker-summary-name"]').first().should('contain', 'Sam Jones');
    cy.get('[data-test="worker-summary-gender"]').first().should('contain', 'M');
    cy.get('[data-test="worker-summary-profession"]').first().should('contain', 'Graphic Designer');

    cy.get('[data-test="nav-logo"]').click();
    cy.url().should('include', '/');
  })
})