@UseCase1 @AddEmp
Feature: Use Case 1: Add New Employee

  Scenario: Hourly employees can be added
    Given a new hourly employee Bob
    When I execute the AddEmp command on Bob
    Then Bob should fully exist in the employee DB

  Scenario: Salaried employees can be added
    Given a new salaried employee Alice
    When I execute the AddEmp command on Alice
    Then Alice should fully exist in the employee DB

  Scenario: Commissioned employees can be added
    Given a new commissioned employee John
    When I execute the AddEmp command on John
    Then John should fully exist in the employee DB

  Scenario: An incorrect transaction should do nothing
    Given a new hourly employee Mary
    When I execute the incomplete AddEmp command on Mary
    Then Mary should not exist in the employee DB
