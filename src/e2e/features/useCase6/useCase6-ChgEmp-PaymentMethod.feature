@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  # -------------------
  # To hold
  # -------------------

  Scenario: it should set the employee's payment method to Hold
    Given an employee Bob
    And a new "Hold" payment method "PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "PM"
    Then "Bob" should have the payment method "PM"

  Scenario: it should replace the employee's payment method to Hold
    Given an employee Bob
    And a "Direct" payment method "old PM" for "Bob"
    And a new "Hold" payment method "new PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "new PM"

  # -------------------
  # To Direct
  # -------------------

  Scenario: it should set the employee's payment method to Direct
    Given an employee Bob
    And a new "Direct" payment method "PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "PM"
    Then "Bob" should have the payment method "PM"

  Scenario: it should replace the employee's payment method to Direct
    Given an employee Bob
    And a "Hold" payment method "old PM" for "Bob"
    And a new "Direct" payment method "new PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "new PM"

  Scenario: it should do nothing when the transaction is incomplete
    Given an employee Bob
    And a "Hold" payment method "old PM" for "Bob"
    And a new "Direct" payment method "new PM" for "Bob"
    When I execute an incomplete ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "old PM"

  # -------------------
  # To Mail
  # -------------------

  Scenario: it should set the employee's payment method to Mail
    Given an employee Bob
    And a new "Mail" payment method "new PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "new PM"

  Scenario: it should replace the employee's payment method to Mail
    Given an employee Bob
    And a "Hold" payment method "old PM" for "Bob"
    And a new "Mail" payment method "new PM" for "Bob"
    When I execute the ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "new PM"

  Scenario: it should do nothing when the transaction is incomplete
    Given an employee Bob
    And a "Hold" payment method "old PM" for "Bob"
    And a new "Mail" payment method "new PM" for "Bob"
    When I execute an incomplete ChgEmp command on "Bob" to change the payment method to "new PM"
    Then "Bob" should have the payment method "old PM"
