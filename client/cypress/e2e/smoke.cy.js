describe('Smoke Test', () => {
  it('can view the home page', () => {
  cy.visit('/');
  cy.contains('Welcome to MSCI Connect!');
  cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic').click().type('test@uwaterloo.ca');
  cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic').click().type('password');
  cy.get('.MuiButtonBase-root').click()
  cy.get('.MuiToolbar-root > :nth-child(2) > .MuiButton-label').click();
  cy.contains('From: Saif');
  cy.contains('Topic: MSCI 334');
  cy.contains('Content: Can anyone help me understand example 3 from lecture 3.4?');

  });
  });