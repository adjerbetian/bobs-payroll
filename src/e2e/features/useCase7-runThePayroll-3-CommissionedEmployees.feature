@UseCase7 @Payday
Feature: Use Case 7: Run the Payroll for Today - Commissioned employees

  Scenario: Commissioned employees are paid their salary at the end of the month
    Given a commissioned employee Bob with a salary of 2500
    When I execute the Payday command on the last day of the month
    Then Bob should have been paid on the last day of the month of an amount of 2500

  Scenario: Sales receipts are added to the salary according to the commission rate
    Given a commissioned employee Claire with a salary of 3000 and a commission rate of 0.05
    And a sales receipt for Claire of an amount of 10000 on the first day of the month
    And a sales receipt for Claire of an amount of 15000 on the second day of the month
    When I execute the Payday command on the last day of the month
    Then Claire should have been paid on the last day of the month of an amount of 3000 + 0.05*( 10000 + 15000 )

  Scenario: Sales receipts of the previous month should not be repaid
    Given a commissioned employee Jane with a salary of 3000 and a commission rate of 0.05
    And a sales receipt for Jane of an amount of 10000 on the first day of last month
    When I execute the Payday command on the last day of the month
    Then Jane should have been paid on the last day of the month of an amount of 3000

  Scenario: Commissioned employees are only paid at the end of the month
    Given a commissioned employee Pierre with a salary of 2500
    And a sales receipt for Pierre of an amount of 10000 on the third day of last month
    When I execute the Payday command on the second day of the month
    Then Pierre should not have been paid on the second day of the month
