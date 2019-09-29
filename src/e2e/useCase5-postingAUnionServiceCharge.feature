Feature: Use Case 5: Posting a Union Service Charge

  Scenario: it should insert the service charge in the db
    Given an employee "Bob"
    And a union membership for "Bob"
    And a new service charge "SC" for "Bob"
    When I execute the ServiceCharge command on "SC"
    Then "Bob" should have the service charge "SC"

  Scenario: it should do nothing when the user is not a union member
     # the unionMember is not inserted in the db because of the new
    Given an employee "Bob"
    And a new union membership for "Bob"
    And a new service charge "SC" for "Bob"
    When I execute the ServiceCharge command on "SC"
    Then "Bob" should not have the service charge "SC"

  Scenario: it should do nothing when transaction is incomplete
    Given an employee "Bob"
    And a union membership for "Bob"
    And a new service charge "SC" for "Bob"
    When I execute an incomplete ServiceCharge command on "SC"
    Then "Bob" should not have the service charge "SC"