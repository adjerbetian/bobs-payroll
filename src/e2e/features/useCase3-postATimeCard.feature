@UseCase3 @TimeCard
Feature: Use Case 3: Post a Time Card

  Scenario: Time cards can be posted for hourly employees
    Given an hourly employee Bob
    And a new time card TC for Bob
    When I execute the TimeCard command on TC
    Then Bob should have the time card TC

  Scenario: Time cards are only valid for hourly employees
    Given a salaried employee Bob
    And a new time card TC for Bob
    When I execute the TimeCard command on TC
    Then Bob should not have the time card TC

  Scenario: Time cards should be posted on existing employees
    Given a new salaried employee Alice
    And a new time card TC for Alice
    When I execute the TimeCard command on TC
    Then Alice should not have the time card TC

  Scenario: An incorrect transaction should do nothing
    Given a salaried employee Bob
    And a new time card TC for Bob
    When I execute the incomplete TimeCard command on TC
    Then Bob should not have the time card TC

