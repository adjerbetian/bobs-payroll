@UseCase6 @ChgEmp
Feature: Use Case 6: Changing Employee Details - Basic infos

  # -------------
  # Basic infos
  # -------------

  Scenario: it should change the employee's name
    Given an employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "name" to "James"
    Then "Bob" should have its "name" set to "James"

  Scenario: it should change the employee's name
    Given an employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "address" to "my new address"
    Then "Bob" should have its "address" set to "my new address"

  Scenario: it should do nothing when the employee does not exist
    Given a new employee "Bob"
    When I execute the ChgEmp command on "Bob" to change the "name" to "James"
    Then "Bob" should still not exist in the employee DB

  # -------------
  # Type
  # -------------

  Scenario: it should change the employee to hourly
    Given a "salaried" employee "Marta"
    When I execute the ChgEmp command on "Marta" to change the type to hourly with a hourly rate of 10.5
    Then "Marta" should be of type "hourly"
    And "Marta" should have an hourly rate of 10.5

#        it("should change the employee to monthly salary", async () => {
#            employee = await seeders.seedHourlyEmployee();
#
#            await executePayrollCommand(`ChgEmp ${employee.getId()} Salaried 2000`);
#
#            const dbEmployee = (await fetchEmployeeById(employee.getId())) as SalariedEmployee;
#            expect(dbEmployee.getType()).to.equal(EmployeeType.SALARIED);
#            expect(dbEmployee.getSalary()).to.equal(2000);
#        });
#        it("should change the employee to commissioned", async () => {
#            employee = await seeders.seedHourlyEmployee();
#
#            await executePayrollCommand(`ChgEmp ${employee.getId()} Commissioned 2000 0.01`);
#
#            const dbEmployee = (await fetchEmployeeById(employee.getId())) as CommissionedEmployee;
#            expect(dbEmployee.getType()).to.equal(EmployeeType.COMMISSIONED);
#            expect(dbEmployee.getSalary()).to.equal(2000);
#            expect(dbEmployee.getCommissionRate()).to.equal(0.01);
#        });


#Feature: Use Case 6: Changing Employee Details - Payment method
#Feature: Use Case 6: Changing Employee Details - Union
#
