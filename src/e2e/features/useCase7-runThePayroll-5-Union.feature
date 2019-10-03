@UseCase7 @Payday
Feature: Use Case 7: Run the Payroll for Today - Union

  @todo
  Scenario: Weekly due rates should be deduced from the payment of hourly employees
    Given an hourly employee Bob with a hourly rate of 15
    And a time card for Bob of 6 hours on tuesday
    And a union membership for Bob with a rate of 0.1
    When I execute the Payday command on friday
    Then Bob should have been paid on friday of an amount of 15 * 6 * (1 - 0.1)

  @todo
  Scenario: Monthly due rates should be deduced from the payment of salaried employees
    Given a salaried employee Pauline with a salary of 1500
    And a union membership for Pauline with a rate of 0.1
    When I execute the Payday command on friday
    Then Pauline should have been paid on friday of an amount of 1500 * (1 - 0.1)

  @todo
  Scenario: Service charges should be deduced from the employee's payment

  @todo
  Scenario: Service charges of the previous month should not be charged to salaried employees

  @todo
  Scenario: Service charges of the previous week should not be charged to hourly employees
