Feature: Use Case 3: Post a Time Card

  Scenario: should insert the time card in the db
    Given an "hourly" employee
    And a new time card
    When I execute the TimeCard command
    Then the employee should have the time card

