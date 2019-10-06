@UseCase7 @Payday
Feature: Use Case 7: Run the Payroll for Today

  Scenario: Employee's time card should be paid
    Given an hourly employee Bob with a hourly rate of 15.5
    And a time card for Bob of 5 hours on monday
    And a time card for Bob of 6 hours on tuesday
    When I execute the Payday command on friday
    Then Bob should have been paid on friday of an amount of 15.5 * (5 + 6)

  Scenario: Extra hours (>8h a day) should be paid 1.5 time the normal rate
    Given an hourly employee Camille with a hourly rate of 13
    And a time card for Camille of 12 hours on monday
    When I execute the Payday command on friday
    Then Camille should have been paid on friday of an amount of 13*(8 + 4*1.5)

  Scenario: Already paid time cards should not be repaid
    Given an hourly employee Jack with a hourly rate of 18
    And a time card for Jack of 5 hours on last monday
    And a payment for Jack on last friday
    And a time card for Jack of 6 hours on wednesday
    When I execute the Payday command on friday
    Then Jack should have been paid on friday of an amount of 18 * 6

  Scenario: Hourly employees are paid only on fridays
    Given an hourly employee Bob with a hourly rate of 15
    And a time card for Bob of 5 hours on monday
    When I execute the Payday command on wednesday
    Then Bob should not have been paid on wednesday

  Scenario: Complex hourly scenario
    Given an hourly employee Alex with a hourly rate of 22
    And a time card for Alex of 9 hours on last monday
    And a time card for Alex of 11 hours on last wednesday
    And a payment for Alex on last friday
    And a time card for Alex of 6 hours on monday
    And a time card for Alex of 7.5 hours on tuesday
    And a time card for Alex of 8 hours on wednesday
    And a time card for Alex of 9 hours on thursday
    And a time card for Alex of 10.5 hours on friday

    And an hourly employee Adrien with a hourly rate of 17.5
    And a time card for Adrien of 9 hours on last thursday
    And a payment for Adrien on last friday
    And a time card for Adrien of 15 hours on monday
    And a time card for Adrien of 2.5 hours on tuesday

    When I execute the Payday command on friday
    Then Alex should have been paid on friday of an amount of 22 * (6 + 7.5 + 8 + (8 + 1*1.5) + (8 + 2.5*1.5))
    And Adrien should have been paid on friday of an amount of 17.5 * ((8 + 7*1.5) + 2.5)
