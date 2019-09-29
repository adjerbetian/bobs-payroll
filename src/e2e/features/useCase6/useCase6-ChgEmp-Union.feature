@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Union

  # member

  Scenario: it should put the employee in the union
    Given an employee "Marta"
    And a new union membership "UM" for "Marta"
    When I execute the ChgEmp command on "Marta" to add the membership "UM"
    Then "Marta" should have the union membership "UM"

  Scenario: it should do nothing if the employee does not exist
    Given a new employee "Jack"
    And a new union membership "UM" for "Jack"
    When I execute the ChgEmp command on "Jack" to add the membership "UM"
    Then the union membership "UM" should not exist in db

  Scenario: it should do nothing if transaction is incomplete
    Given an employee "Alice"
    And a new union membership "UM" for "Alice"
    When I execute an incomplete ChgEmp command on "Alice" to add the membership "UM"
    Then the union membership "UM" should not exist in db

  Scenario: it should do nothing when the member id is already used
    Given an employee "Jean"
    And a union membership "used membership" for "Jean"
    And another employee "Alex"
    And a union membership "new membership" for "Alex" with the same member id as "used membership"
    When I execute the ChgEmp command on "Alex" to add the membership "new membership"
    Then the union membership "new membership" should not exist in db

  # No member

  Scenario: it should remove the membership
    Given an employee "Kevin"
    And a union membership "membership" for "Kevin"
    When I execute the ChgEmp command on "Kevin" to remove from the union
    Then the union membership "membership" should not exist in db
