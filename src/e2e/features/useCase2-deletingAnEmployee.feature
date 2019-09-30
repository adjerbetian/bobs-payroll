@UseCase2 @DelEmp
Feature: Use Case 2: Deleting an Employee

  Scenario: it should delete an existing employee from the database
    Given an hourly employee Bob
    When I execute the DelEmp command on "Bob"
    Then Bob should not exist in the employee DB

  Scenario: it should do nothing when deleting a non existent user
    Given an hourly employee Bob
    And an hourly employee Alice
    When I execute the DelEmp command on "Bob"
    Then Alice should exist in the employee DB
