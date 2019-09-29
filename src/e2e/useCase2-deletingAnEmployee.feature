Feature: Use Case 2: Deleting an Employee

  Scenario: it should delete an existing employee from the database
    Given an "hourly" employee
    When I execute the DelEmp command
    Then the employee should not exist in the DB

  Scenario: it should do nothing when deleting a non existent user
    Given an "hourly" employee
    When I execute the DelEmp command on another employee
    Then the employee should still exist in the DB
