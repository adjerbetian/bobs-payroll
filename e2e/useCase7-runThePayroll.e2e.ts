describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        it.skip("should pay the hours made in his time cards", async () => {});
        it.skip("should not include the time cards already paid", async () => {});
        it.skip("should not pay if it's not Friday", async () => {});
        it.skip("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {});
        it.skip("work on a complex example", async () => {});
    });
    describe("salaried employees", () => {
        it.skip("should pay the monthly salary", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
    });
    describe("salaried employees", () => {
        it.skip("should pay the monthly salary", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
        it.skip("should not pay twice even if we run the program twice on the same day", async () => {});
    });
    describe("commissioned employees", () => {
        it.skip("should pay only the monthly salary when there are no sales receipt", async () => {});
        it.skip("should include the commissions of all the sales receipts", async () => {});
        it.skip("should not include the commissions of the sales receipts of the previous month", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
        it.skip("should not pay twice the salary and the commission even if we run the program twice on the same day", async () => {});
    });
    describe("payment method", () => {
        it.skip("should include the employee payment method", async () => {});
        it.skip("should include the hold payment method if not specified", async () => {});
    });
    describe("union", () => {
        it.skip("should deduce the weekly dues rate from the salary", async () => {});
        it.skip("should deduce the service charges", async () => {});
        it.skip("should not deduce the already paid service charges", async () => {});
    });
});
