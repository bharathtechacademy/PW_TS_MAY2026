//Assertions : Assertions are nothing but the default methods provided by Playwright to compare expected result vs actual result.

//In Playwright, there are two different types of assertions available. 

//1. Hard Assertions : If an assertion fails, the test will stop executing immediately. 
//2. Soft Assertions : If an assertion fails, the test will continue execution and fail at the end of the test.


//Syntax of Hard Assertions :
//expect(actual).toBe(expected); 

//Syntax of Soft Assertions :
//expect.soft(actual).toBe(expected); 

import { test, expect } from '@playwright/test';

test('Sample Playwright Assertions', async ({ page }) => {

});