
// The following test posts a new chat message with a unique message, reloads the page and checks that the message is on the site 
// it then deletes the message and reloads then checks that the messsage is no longer there so that the next time this test runs 
// we ensure that the unique message is there from that run  

// this test requires that a user be signed in therefore it is advisable to run the smoke.cy.js test prior to running this test 

describe('Smoke Test', () => {
  
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