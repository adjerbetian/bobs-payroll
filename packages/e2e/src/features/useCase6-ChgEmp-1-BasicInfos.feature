@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  Scenario: The name of an employee can be changed
    Given an employee Bob
    When I execute the ChgEmp command on Bob to change the name to James
    Then Bob should have its name set to James

  Scenario: The address of an employee can be changed
    Given an employee Bob
    When I execute the ChgEmp command on Bob to change the address to "my new address"
    Then Bob should have its address set to "my new address"

  Scenario: An incorrect transaction should do nothing
    Given a new employee Bob
    When I execute the ChgEmp command on Bob to change the name to James
    Then Bob should not exist in the employee DB
