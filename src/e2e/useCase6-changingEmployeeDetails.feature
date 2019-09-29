@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  # -------------
  # Basic infos
  # -------------

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

  # -------------
  # Type
  # -------------

  Scenario: it should change the employee to hourly
    Given a "salaried" employee "Marta"
    When I execute the ChgEmp command on "Marta" to change the type to hourly with a hourly rate of 10.5
    Then "Marta" should be of type "hourly"
    And "Marta" should have its "hourly rate" set to "10.5"

  Scenario: it should change the employee to salaried
    Given an "hourly" employee "John"
    When I execute the ChgEmp command on "John" to change the type to salaried with a salary of 2500.0
    Then "John" should be of type "salaried"
    And "John" should have its "salary" set to "2500.0"

  Scenario: it should change the employee to commissioned
    Given an "hourly" employee "James"
    When I execute the ChgEmp command on "James" to change the type to commissioned with a salary of 2500.0 and a commission rate of 0.01
    Then "James" should be of type "commissioned"
    And "James" should have its "salary" set to "2500.0"
    And "James" should have its "commission rate" set to "0.01"

#Feature: Use Case 6: Changing Employee Details - Payment method
#Feature: Use Case 6: Changing Employee Details - Union
#
