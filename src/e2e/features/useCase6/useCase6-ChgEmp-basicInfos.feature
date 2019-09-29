@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  Scenario: it should change the employee's name
    Given an employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "name" to "James"
    Then "Bob" should have its "name" set to "James"

  Scenario: it should change the employee's name
    Given an employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "address" to "my new address"
    Then "Bob" should have its "address" set to "my new address"

  Scenario: it should do nothing when the employee does not exist
    Given a new employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "name" to "James"
    Then "Bob" should still not exist in the employee DB
