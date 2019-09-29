@UseCase5 @ServiceCharge
Feature: Use Case 5: Posting a Union Service Charge

  Scenario: it should insert the service charge in the db
    Given an employee "Bob"
    And a union membership "UM" for "Bob"
    And a new service charge "SC" for "UM"
    When I execute the ServiceCharge command on "SC"
    Then "Bob" should have the service charge "SC"

  Scenario: it should do nothing when the user is not a union member
    Given an employee "Bob"
    And a new union membership "non existing membership" for "Bob"
    And a new service charge "SC" for "non existing membership"
    When I execute the ServiceCharge command on "SC"
    Then the service charge "SC" should not have been inserted

  Scenario: it should do nothing when transaction is incomplete
    Given an employee "Bob"
    And a union membership "UM" for "Bob"
    And a new service charge "SC" for "UM"
    When I execute an incomplete ServiceCharge command on "SC"
    Then the service charge "SC" should not have been inserted
