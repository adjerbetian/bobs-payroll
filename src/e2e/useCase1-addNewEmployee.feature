Feature: Use Case 1: Add New Employee

  Scenario: it should add an hourly employee
    Given a new "hourly" employee "Bob"
    When I execute the AddEmp command on "Bob"
    Then "Bob" should fully exist in the employee DB

  Scenario: it should add a salaried employee
    Given a new "salaried" employee "Alice"
    When I execute the AddEmp command on "Alice"
    Then "Alice" should fully exist in the employee DB

  Scenario: it should add a commissioned employee
    Given a new "commissioned" employee "John"
    When I execute the AddEmp command on "John"
    Then "John" should fully exist in the employee DB

  Scenario: it should do nothing when the transaction is incorrect
    Given a new "hourly" employee "Mary"
    When I execute an incomplete AddEmp command on "Mary"
    Then "Mary" should not exist in the employee DB
