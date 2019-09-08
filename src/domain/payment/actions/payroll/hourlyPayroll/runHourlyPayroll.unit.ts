import {
    buildStubbedCoreActions,
    buildStubFor,
    entityGenerators,
    expect,
    friday,
    lastFriday,
    never,
    Stub
} from "@test/unit";
import { CoreActions } from "../../../../core";
import { PaymentRepository } from "../../../repositories";
import { buildStubbedPaymentRepository } from "../../../test";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunHourlyPayroll } from "./runHourlyPayroll";

describe("action runHourlyPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedPaymentRepository: Stub<PaymentRepository>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: ReturnType<typeof makeRunHourlyPayroll>;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();
        stubbedPaymentRepository = buildStubbedPaymentRepository();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = makeRunHourlyPayroll({
            coreActions: stubbedCoreActions,
            paymentRepository: stubbedPaymentRepository,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
        stubbedCoreActions.fetchEmployeeTimeCardsSince.resolves([]);
        stubbedPaymentRepository.fetchEmployeeLastPaymentDate.resolves(never);
    });

    it("should insert payments for each employee", async () => {
        const employees = [entityGenerators.generateHourlyEmployee(), entityGenerators.generateHourlyEmployee()];
        stubbedCoreActions.fetchAllHourlyEmployees.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    it("should insert the right payment the employee", async () => {
        const employee = entityGenerators.generateHourlyEmployee();
        const timeCards = [entityGenerators.generateTimeCard(), entityGenerators.generateTimeCard()];
        stubbedPaymentRepository.fetchEmployeeLastPaymentDate.resolves(lastFriday);
        stubbedCoreActions.fetchEmployeeTimeCardsSince.withArgs(employee.getId(), lastFriday).resolves(timeCards);
        stubbedCoreActions.fetchAllHourlyEmployees.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.getId(),
            date: friday,
            amount: employee.computePayAmount(timeCards)
        });
    });
});
