
// The following test signs in with a test account ensures a particular chat message is visible in the chat page 
// then signs out checking to make sure the sign in page is displayed.


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
    cy.get(':nth-child(8) > .MuiButton-label').click()
    cy.contains('Welcome to MSCI Connect!');


  });
  });