@UseCase4 @SalesReceipt
Feature: Use Case 4: Post a Sales Receipt

  Scenario: Sales receipts can be posted for commissioned employees
    Given a commissioned employee Bob
    And a new sales receipt SR for Bob
    When I execute the SalesReceipt command on SR
    Then Bob should have the sales receipt SR

  Scenario: Sales receipts are valid only for commissioned employees
    Given a salaried employee Mary
    And a new sales receipt SR for Mary
    When I execute the SalesReceipt command on SR
    Then Mary should not have the sales receipt SR

  Scenario: Sales receipt should be posted on existing employees
    Given a new salaried employee Alice
    And a new sales receipt SR for Alice
    When I execute the SalesReceipt command on SR
    Then Alice should not have the sales receipt SR

  Scenario: An incorrect transaction should do nothing
    Given a commissioned employee Bob
    And a new sales receipt SR for Bob
    When I execute the incomplete SalesReceipt command on SR
    Then Bob should not have the sales receipt SR

