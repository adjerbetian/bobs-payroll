Feature: Use Case 3: Post a Time Card

  Scenario: should insert the time card in the db
    Given an "hourly" employee "Bob"
    And a new time card "tc1" for "Bob"
    When I execute the TimeCard command on "tc1"
    Then "Bob" should have the time card "tc1"

