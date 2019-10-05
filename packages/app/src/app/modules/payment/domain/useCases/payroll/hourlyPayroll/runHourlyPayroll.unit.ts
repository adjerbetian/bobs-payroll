import { buildStubFor, generators, expect, friday, lastFriday, never, Stub } from "../../../../../../../test/unit";
import { CoreUseCases } from "../../../../../core";
import { buildStubbedCoreUseCases } from "../../../../test";
import { PaymentRepository } from "../../../repositories";
import { buildStubbedPaymentRepository } from "../../../test";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunHourlyPayroll } from "./runHourlyPayroll";

describe("use case - runHourlyPayroll", () => {
    let stubbedCoreUseCases: Stub<CoreUseCases>;
    let stubbedPaymentRepository: Stub<PaymentRepository>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: ReturnType<typeof makeRunHourlyPayroll>;

    beforeEach(() => {
        stubbedCoreUseCases = buildStubbedCoreUseCases();
        stubbedPaymentRepository = buildStubbedPaymentRepository();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = makeRunHourlyPayroll({
            coreUseCases: stubbedCoreUseCases,
            paymentRepository: stubbedPaymentRepository,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
        stubbedCoreUseCases.fetchEmployeeTimeCardsSince.resolves([]);
        stubbedPaymentRepository.fetchEmployeeLastPaymentDate.resolves(never);
    });

    it("should insert payments for each employee", async () => {
        const employees = [generators.generateHourlyEmployee(), generators.generateHourlyEmployee()];
        stubbedCoreUseCases.fetchAllHourlyEmployees.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    it("should insert the right payment the employee", async () => {
        const employee = generators.generateHourlyEmployee();
        const timeCards = [generators.generateTimeCard(), generators.generateTimeCard()];
        stubbedPaymentRepository.fetchEmployeeLastPaymentDate.resolves(lastFriday);
        stubbedCoreUseCases.fetchEmployeeTimeCardsSince.withArgs(employee.getId(), lastFriday).resolves(timeCards);
        stubbedCoreUseCases.fetchAllHourlyEmployees.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.getId(),
            date: friday,
            amount: employee.computePayAmount(timeCards)
        });
    });
});
