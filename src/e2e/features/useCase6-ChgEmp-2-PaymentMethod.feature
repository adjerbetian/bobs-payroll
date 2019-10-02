@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  # -------------------
  # To hold
  # -------------------

  Scenario: it should set the employee's payment method to Hold
    Given an employee Bob
    And a new hold payment method PM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to PM
    Then Bob should have the payment method PM

  Scenario: it should replace the employee's payment method to Hold
    Given an employee Bob
    And a direct payment method oldPM for Bob
    And a new hold payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  # -------------------
  # To Direct
  # -------------------

  Scenario: it should set the employee's payment method to Direct
    Given an employee Bob
    And a new direct payment method PM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to PM
    Then Bob should have the payment method PM

  Scenario: it should replace the employee's payment method to Direct
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new direct payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: it should do nothing when the transaction is incomplete
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new direct payment method newPM for Bob
    When I execute the incomplete ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method oldPM

  # -------------------
  # To Mail
  # -------------------

  Scenario: it should set the employee's payment method to Mail
    Given an employee Bob
    And a new mail payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: it should replace the employee's payment method to Mail
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new mail payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: it should do nothing when the transaction is incomplete
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new mail payment method newPM for Bob
    When I execute the incomplete ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method oldPM
