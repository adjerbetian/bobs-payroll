@UseCase7 @Payday
Feature: Use Case 7: Run the Payroll for Today - Salaried employees

  Scenario: Salaried employees are paid their salary at the end of the month
    Given a salaried employee Bob with a salary of 2500
    When I execute the Payday command on the last day of the month
    Then Bob should have been paid on the last day of the month of an amount of 2500

  Scenario: Salaried employees are only paid at the end of the month
    Given a salaried employee Bob with a salary of 2500
    When I execute the Payday command on the second day of the month
    Then Bob should not have been paid on the second day of the month
