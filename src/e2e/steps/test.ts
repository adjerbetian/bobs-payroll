import { expect } from "chai";
import { Given, Then, When } from "cucumber";

let variable: number;

Given("a variable set to {int}", function(number: number) {
    variable = number;
});

When("I increment the variable by {int}", function(increment: number) {
    variable += increment;
});

Then("the variable should contain {int}", function(number: number) {
    expect(variable).to.equal(number);
});
