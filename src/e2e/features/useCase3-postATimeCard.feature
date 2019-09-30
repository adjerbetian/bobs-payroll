@UseCase3 @TimeCard
Feature: Use Case 3: Post a Time Card

  Scenario: it should insert the time card in the db
    Given an hourly employee Bob
    And a new time card TC for Bob
    When I execute the TimeCard command on "TC"
    Then "Bob" should have the time card "TC"

  Scenario: it should do nothing when the employee in not an hourly employee
    Given a salaried employee Bob
    And a new time card TC for Bob
    When I execute the TimeCard command on "TC"
    Then "Bob" should not have the time card "TC"

  Scenario: it should do nothing when the employee does not exist in the db
    Given a new salaried employee Alice
    And a new time card TC for Alice
    When I execute the TimeCard command on "TC"
    Then "Alice" should not have the time card "TC"

  Scenario: it should do nothing when transaction is wrong
    Given a salaried employee Bob
    And a new time card TC for Bob
    When I execute an incomplete TimeCard command on "TC"
    Then "Bob" should not have the time card "TC"

