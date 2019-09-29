@UseCase6 @ChgEmp
Feature: Use Case 7: Run the Payroll for Today - Salaried employees

  Scenario: it should pay the monthly salary
    Given a salaried employee "Bob" with a salary of 2500.0
    When I execute the Payday command on the "last day of the month"
    Then "Bob" should have been paid on the "last day of the month" of an amount of "2500.0"

  Scenario: it should pay the monthly salary
    Given a salaried employee "Bob" with a salary of 2500.0
    When I execute the Payday command on the "second day of the month"
    Then "Bob" should not have been paid on the "second day of the month"
