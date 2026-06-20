//hooks in playwright :Hooks are nothing but the preconditions and postconditions used during the execution process within the Playwright. 

//There are four different types of hooks available within the Playwright. 
//1. beforeAll() : This hook is used to execute the code before the execution of all the test cases.
//2. afterAll() : This hook is used to execute the code after the execution of all the test cases.
//3. beforeEach() : This hook is used to execute the code before the execution of each test case.
//4. afterEach() : This hook is used to execute the code after the execution of each test case.

import { test, expect } from '@playwright/test';

test.describe('Group 1 Tests', async () => {

    test('Group 1- Test 1', async ({ page }) => {
        console.log("Group 1 - Test 1: Executing");
    });

    test('Group 1- Test 2', async ({ page }) => {
        console.log("Group 1 - Test 2: Executing");
    });

    test('Group 1- Test 3', async ({ page }) => {
        console.log("Group 1 - Test 3: Executing");
    });

});


test.describe('Group 2 Tests', async () => {

    test.beforeAll(async () => {
        console.log("^^^^^^^^^^^^Group 2 - Before All: Executing^^^^^^^^^^^^^^^^");
    });

    test.afterAll(async () => {
        console.log("vvvvvvvvvvGroup 2 - After All: Executingvvvvvvvvvv");
    });

    test.beforeEach(async () => {
        console.log("@@@@@@@@@Group 2 - Before Each: Executing@@@@@@@@@@@");
    });

    test.afterEach(async () => {
        console.log("##########Group 2 - After Each: Executing##########");
    });

    test('Group 2- Test 1', async ({ page }) => {
        console.log("Group 2 - Test 1: Executing");
    });

    test('Group 2- Test 2', async ({ page }) => {
        console.log("Group 2 - Test 2: Executing");
    });

    test('Group 2- Test 3', async ({ page }) => {
        console.log("Group 2 - Test 3: Executing");
    });

});