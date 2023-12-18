describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Contains correct headers text', () => {
    cy.get('[data-test="home-header"]').contains(/Find your Oompa Loompa/i)
    cy.get('[data-test="home-subheader"]').contains(/There are more than 100k/i)
  })
})