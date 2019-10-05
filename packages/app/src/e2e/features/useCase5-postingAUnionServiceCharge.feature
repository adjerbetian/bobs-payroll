@UseCase5 @ServiceCharge
Feature: Use Case 5: Posting a Union Service Charge

  Scenario: Service charge can be posted for union members
    Given an employee Bob
    And a union membership UM for Bob
    And a new service charge SC for UM
    When I execute the ServiceCharge command on SC
    Then Bob should have the service charge SC

  Scenario: Service charge cannot be associated to non union members
    Given an employee Bob
    And a new union membership nonExistingMembership for Bob
    And a new service charge SC for nonExistingMembership
    When I execute the ServiceCharge command on SC
    Then Bob should not have the service charge SC

  Scenario: An incorrect transaction should do nothing
    Given an employee Bob
    And a union membership UM for Bob
    And a new service charge SC for UM
    When I execute the incomplete ServiceCharge command on SC
    Then Bob should not have the service charge SC
