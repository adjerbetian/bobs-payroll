@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  # -------------------
  # To hold
  # -------------------

  Scenario: The employee's payment method can be set to hold
    Given an employee Bob
    And a new hold payment method PM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to PM
    Then Bob should have the payment method PM

  Scenario: The employee's payment method can be replaced to hold
    Given an employee Bob
    And a direct payment method oldPM for Bob
    And a new hold payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  # -------------------
  # To Direct
  # -------------------

  Scenario: The employee's payment method can be set to direct payment
    Given an employee Bob
    And a new direct payment method PM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to PM
    Then Bob should have the payment method PM

  Scenario: The employee's payment method can be replaced to direct payment
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new direct payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: An incorrect transaction should do nothing
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new direct payment method newPM for Bob
    When I execute the incomplete ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method oldPM

  # -------------------
  # To Mail
  # -------------------

  Scenario: The employee's payment method can be set to mail
    Given an employee Bob
    And a new mail payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: The employee's payment method can be replaced to mail
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new mail payment method newPM for Bob
    When I execute the ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method newPM

  Scenario: An incorrect transaction should do nothing
    Given an employee Bob
    And a hold payment method oldPM for Bob
    And a new mail payment method newPM for Bob
    When I execute the incomplete ChgEmp command on Bob to change the payment method to newPM
    Then Bob should have the payment method oldPM
