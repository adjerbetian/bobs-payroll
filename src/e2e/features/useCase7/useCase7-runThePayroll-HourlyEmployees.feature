@UseCase6 @ChgEmp
Feature: Use Case 7: Run the Payroll for Today - Hourly employees

  Scenario: should pay the hours made in the employee's time cards
    Given an hourly employee Bob with a hourly rate of 15.0
    And a time card for Bob of 5.0 hours on monday
    And a time card for Bob of 6.0 hours on tuesday
    When I execute the Payday command on "friday"
    Then "Bob" should have been paid on "friday" of an amount of "15.0 * (5.0 + 6.0)"

  Scenario: should pay 1.5 time the normal rate for extra hours (>8h a day)
    Given an hourly employee Camille with a hourly rate of 13.5
    And a time card for Camille of 12.0 hours on monday
    When I execute the Payday command on "friday"
    Then "Camille" should have been paid on "friday" of an amount of "13.5 * (8.0 + 1.5*4.0)"

  Scenario: should not include the time cards already paid
    Given an hourly employee Jack with a hourly rate of 18.0
    And a time card for Jack of 5.0 hours on last monday
    And a payment for "Jack" on "last friday"
    And a time card for Jack of 6.0 hours on wednesday
    When I execute the Payday command on "friday"
    Then "Jack" should have been paid on "friday" of an amount of "18.0 * 6.0"

  Scenario: should not pay if it's not Friday
    Given an hourly employee Bob with a hourly rate of 15.0
    And a time card for Bob of 5.0 hours on monday
    When I execute the Payday command on "wednesday"
    Then "Bob" should not have been paid on "wednesday"

  Scenario: complex hourly scenario
    Given an hourly employee Alex with a hourly rate of 22.0
    And a time card for Alex of 9.0 hours on last monday
    And a time card for Alex of 11.0 hours on last wednesday
    And a payment for "Alex" on "last friday"
    And a time card for Alex of 6.0 hours on monday
    And a time card for Alex of 7.0 hours on tuesday
    And a time card for Alex of 8.0 hours on wednesday
    And a time card for Alex of 9.0 hours on thursday
    And a time card for Alex of 10.0 hours on friday

    And an hourly employee Adrien with a hourly rate of 17.5
    And a time card for Adrien of 9.0 hours on last thursday
    And a payment for "Adrien" on "last friday"
    And a time card for Adrien of 15.0 hours on monday
    And a time card for Adrien of 2.5 hours on tuesday

    When I execute the Payday command on "friday"
    Then "Alex" should have been paid on "friday" of an amount of "22.0 * (6.0 + 7.0 + 8.0 + (8.0 + 1.0*1.5) + (8.0 + 2.0*1.5))"
    And "Adrien" should have been paid on "friday" of an amount of "17.5 * ((8.0 + 7.0*1.5) + 2.5)"
