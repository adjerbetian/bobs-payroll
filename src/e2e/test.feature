Feature: Test

  Scenario: test 1
    Given a variable set to 3
    When I increment the variable by 2
    Then the variable should contain 5

  Scenario: test 2
    Given a variable set to 5
    When I increment the variable by 90
    Then the variable should contain 95
