@UseCase7 @Payday
Feature: Use Case 7: Run the Payroll for Today - Payment Method

  Scenario: The payment should be made with the employee's payment method
    Given a salaried employee Bob
    And a direct payment method PM for Bob
    When I execute the Payday command on the last day of the month
    Then Bob should have been paid on the last day of the month with the method PM

  Scenario: The payment should be be held when the employee has no specified payment method
    Given a salaried employee Bob
    And a new hold payment method PM for Bob
    When I execute the Payday command on the last day of the month
    Then Bob should have been paid on the last day of the month with the method PM
