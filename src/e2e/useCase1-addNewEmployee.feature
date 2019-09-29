Feature: Use Case 1: Add New Employee

  Scenario: it should add an hourly employee
    Given a new "hourly" employee
    When I execute the AddEmp command
    Then the employee should fully exist in the DB

  Scenario: it should add a salaried employee
    Given a new "salaried" employee
    When I execute the AddEmp command
    Then the employee should fully exist in the DB

  Scenario: it should add a commissioned employee
    Given a new "commissioned" employee
    When I execute the AddEmp command
    Then the employee should fully exist in the DB

  Scenario: it should do nothing when the transaction is incorrect
    Given a new "hourly" employee
    When I execute an incomplete AddEmp command
    Then the employee should not exist in the DB
