describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //click the first "add" button
    cy.get("[alt=Add]")
      .first()
      .click()
    ;
    //Type in student's name in the correct field  
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones", { delay: 50 })
    ;
    //Select an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click()
    ;
    //Save the appointment
    cy.contains("Save")
      .click()
    ;
    //Appointment shows up
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an existing interview", () => {
    //click the top-most appointment's edit button
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true })
    ;
    //Type new name into the 'student name' field
    cy.get("[data-testid=student-name-input]")
      .type("{selectall}{backspace}Siegward Of Catarina", { delay: 50 })
    ;
    //Select a new interviewer
    cy.get("[alt='Tori Malcolm']")
      .click()
    ;
    //Save the appointment
    cy.contains("Save")
      .click()
    ;
    //Appointment shows up
    cy.contains(".appointment__card--show", "Siegward Of Catarina");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an existing interview", () => {
    //click the top-most appointment's delete button
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true })
    ;
    //Click the confirm button
    cy.contains("Confirm")
      .click()
    ;
    //"Deleting..." message should appear and then disappear
    cy.contains("Deleting...")
      .should("exist")
    ;
    cy.contains("Deleting...")
      .should("not.exist")
    ;
    //Appointment is now gone
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist")
    ;
  });
});