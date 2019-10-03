@UseCase2 @DelEmp
Feature: Use Case 2: Deleting an Employee

  Scenario: A employee can be deleted
    Given an hourly employee Bob
    When I execute the DelEmp command on Bob
    Then Bob should not exist in the employee DB

  Scenario: The deletion of an employee should not impact the other employees
    Given an hourly employee Bob
    And an hourly employee Alice
    When I execute the DelEmp command on Bob
    Then Alice should exist in the employee DB
