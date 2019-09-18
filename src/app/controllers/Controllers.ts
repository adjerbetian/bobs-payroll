//prettier-ignore
export interface Controllers {
    processTransaction(transaction: "AddEmp", empId: string, name: string, address: string, type: "H", hourlyRate: string): Promise<void>;
    processTransaction(transaction: "AddEmp", empId: string, name: string, address: string, type: "S", monthlySalary: string): Promise<void>;
    processTransaction(transaction: "AddEmp", empId: string, name: string, address: string, type: "C", monthlySalary: string, commissionRate: string): Promise<void>;

    processTransaction(transaction: "DelEmp", empId: string): Promise<void>;

    processTransaction(transaction: "SalesReceipt", empId: string, date: string, amount: string): Promise<void>;

    processTransaction(transaction: "ServiceCharge", memberId: string, amount: string): Promise<void>;

    processTransaction(transaction: "TimeCard", empId: string, date: string, hours: string): Promise<void>;

    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Name", name: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Address", address: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Hourly", hourlyRate: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Salaried", salary: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Commissioned", salary: string, rate: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Hold"): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Direct", bank: string, account: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Mail", address: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "Member", memberId: string, dues: "Dues", rate: string): Promise<void>;
    processTransaction(transaction: "ChgEmp", empId: string, updateType: "NoMember"): Promise<void>;

    processTransaction(transaction: "Payday", date: string): Promise<void>;
}
