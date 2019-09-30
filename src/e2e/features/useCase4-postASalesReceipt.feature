@UseCase4 @SalesReceipt
Feature: Use Case 4: Post a Sales Receipt

  Scenario: it should insert the sales receipt in the db
    Given a commissioned employee Bob
    And a new sales receipt "SR" for "Bob"
    When I execute the SalesReceipt command on "SR"
    Then "Bob" should have the sales receipt "SR"

  Scenario: it should do nothing when the employee is not commissioned
    Given a salaried employee Mary
    And a new sales receipt "SR" for "Mary"
    When I execute the SalesReceipt command on "SR"
    Then "Mary" should not have the sales receipt "SR"

  Scenario: it should do nothing when the employee does not exist
    Given a new salaried employee Alice
    And a new sales receipt "SR" for "Alice"
    When I execute the SalesReceipt command on "SR"
    Then "Alice" should not have the sales receipt "SR"

  Scenario: it should do nothing when the transaction is incomplete
    Given a commissioned employee Bob
    And a new sales receipt "SR" for "Bob"
    When I execute an incomplete SalesReceipt command on "SR"
    Then "Bob" should not have the sales receipt "SR"

