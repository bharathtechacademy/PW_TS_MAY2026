import {test, expect} from '@playwright/test';

test('Test Case 1', async () => {
    test.slow(); //This test case is expected to take longer than the default timeout of 30 seconds (3*30)
    console.log('This is test case 1');
    expect(1).toBe(1); 
    //add 35 seconds delay to this test case to make it slow
    await new Promise(resolve => setTimeout(resolve, 35000));
    console.log('This is test case 1 after 35 sec delay');
});

test('Test Case 2', async () => {
    console.log('This is test case 2');
});

test('Test Case 3',{tag:'@smoke'}, async () => {
    console.log('This is test case 3');
});