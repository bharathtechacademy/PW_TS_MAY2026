//Annotations are a set of keywords and default methods that will help us to run all our test cases. 

//test => test() represents an independent test method to be executed by Playwright. 
//test.describe() => test.describe() is used to group related test cases together

//test.only() => test.only() is used to run only a specific test case or group of test cases.
//test.skip() => test.skip() is used to skip a specific test case or group of test cases.
//test.fixme() => test.fixme() is used to mark a specific test case or group of test cases as "to be fixed" and will be skipped during execution.
//test.slow()
//test.fail()

import { test, expect } from '@playwright/test';

test('This is an independent test case', async () => {
    test.slow(); //This test case is expected to take longer than the default timeout of 30 seconds (3*30)
    console.log('This is an independent test case');
});

//Grouping related test cases together using test.describe()
test.describe('Login feature', () => {
    test('Login Test', async () => {
        console.log('This is test case 1');
    });

    test('Test case 2', async () => {
        console.log('This is test case 2');
    });
});

test.describe('Signup feature', () => {
    test('Test case 1', async () => {
        console.log('This is test case 1');
    });

    test('Test case 2', async () => {
        console.log('This is test case 2');
    });
});