import { test } from '@playwright/test';
import { JMeterCommons } from '../../commons/jmeter/jmeter-commons.ts';

test.describe('Load Tests', () => {

    let jmeter : JMeterCommons;

    test.beforeEach(()=>{
        jmeter = new JMeterCommons();
    })

    //Test Case 1: Run JMeter Test Plan 'LoadTest.jmx'
    test('Run JMeter Test Plan', async () => {
        // test.setTimeout(600000); // Set timeout to 10 minutes for load test execution
        const jmxFilePath = 'LoadTest.jmx';
        await jmeter.runJMeterTestPlan(jmxFilePath);
    });

});