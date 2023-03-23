
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
    cy.contains('Title: Sprint 1 Extended!');
    cy.contains('Topic: MSCI 342');
    cy.contains('Content: New due date is Wed 2023-03-01');



  });

  it('can post and delete a chat message', () => {
 
    cy.visit('/chat');
    cy.get(':nth-child(4) > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.get('.MuiTextField-root > .MuiInputBase-root > .MuiInputBase-input').click().type('CypressTESTABC')
    cy.get('.MuiDialogContent-root > [style="min-width: 300px;"] > .MuiInputBase-root > #sortBySelector').click()
    cy.get('[data-value="General"]').click()
    cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click()
    cy.get('.MuiToolbar-root > :nth-child(2) > .MuiButton-label').click();
    cy.visit('/chat');
    cy.contains('CypressTESTABC');
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click()
    cy.contains('CypressTESTABC').should('not.exist')


  });








  });