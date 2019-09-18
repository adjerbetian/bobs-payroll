//prettier-ignore
export interface Controllers {
    addEmployee(empId: string, name: string, address: string, type: "H", hourlyRate: string): Promise<void>;
    addEmployee(empId: string, name: string, address: string, type: "S", monthlySalary: string): Promise<void>;
    addEmployee(empId: string, name: string, address: string, type: "C", monthlySalary: string, commissionRate: string): Promise<void>;

    deleteEmployee(empId: string): Promise<void>;

    postSalesReceipt(empId: string, date: string, amount: string): Promise<void>;

    postServiceCharge(memberId: string, amount: string): Promise<void>;

    postTimeCard(empId: string, date: string, hours: string): Promise<void>;

    changeEmployee(empId: string, updateType: "Name", name: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Address", address: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Hourly", hourlyRate: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Salaried", salary: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Commissioned", salary: string, rate: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Hold"): Promise<void>;
    changeEmployee(empId: string, updateType: "Direct", bank: string, account: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Mail", address: string): Promise<void>;
    changeEmployee(empId: string, updateType: "Member", memberId: string, dues: "Dues", rate: string): Promise<void>;
    changeEmployee(empId: string, updateType: "NoMember"): Promise<void>;

    runPayroll(date: string): Promise<void>;
}
