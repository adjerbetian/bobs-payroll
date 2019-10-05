@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Union

  Scenario: An employee can be a member of the union
    Given an employee Marta
    And a new union membership UM for Marta
    When I execute the ChgEmp command on Marta to add the membership UM
    Then Marta should have the union membership UM

  Scenario: Union members can only be registered employees
    Given a new employee Jack
    And a new union membership UM for Jack
    When I execute the ChgEmp command on Jack to add the membership UM
    Then the union membership UM should not exist in db

  Scenario: An incorrect transaction should do nothing
    Given an employee Alice
    And a new union membership UM for Alice
    When I execute an incomplete ChgEmp command on Alice to add the membership UM
    Then the union membership UM should not exist in db

  Scenario: A union member id can only be used once
    Given an employee Jean
    And a union membership for Jean with the member id JeansMemberId
    And an employee Alex
    And a new union membership newMembership for Alex with the member id JeansMemberId
    When I execute the ChgEmp command on Alex to add the membership newMembership
    Then the union membership newMembership should not exist in db

  Scenario: A union member can quit the union
    Given an employee Kevin
    And a union membership UM for Kevin
    When I execute the ChgEmp command on Kevin to remove from the union
    Then the union membership UM should not exist in db
