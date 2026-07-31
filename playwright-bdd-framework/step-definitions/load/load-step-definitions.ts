import { Given, When, Then } from "@cucumber/cucumber";
import { JMeterCommons } from "../../commons/jmeter/jmeter-commons.ts";

let jmeter: JMeterCommons;

//Given Initialize the JMETER utility
Given('Initialize the JMETER utility', function () {
    jmeter = new JMeterCommons();
})

//Then Execute the JMETER test plan "LoadTest.jmx" and publish the results
Then('Execute the JMETER test plan {string} and publish the results', function (testPlanName: string) {
    jmeter.runJMeterTestPlan(testPlanName);
})