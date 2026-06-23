//Xpath -> XPath is all about the XML path of a web element. 

//Xpath Syntaxes 

//Syntax 1 : //tagName[@attribute='value']  -> //purple[@brown= blue]
//Syntax 2 : //tagName[text()='value'] -> //purple[text()='black']

//Syntax 3: //tagName[contains(@attribute,'value')] 
//Syntax 4: //tagName[contains(text(),'value')] 


//Syntax 5: //tagName[starts-with(@attribute,'value')] 
//Syntax 6: //tagName[starts-with(text(),'value')] 

//Syntax 7: //tagName[@attribute1='value'] [@attribute2='value'] [text()='value']


import { test, expect } from '@playwright/test';

test('Xpath Locator', async ({ page }) => {

    // Navigate to the Parabank website
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    //Locate the Parabank logo by using syntax 1. 
    await page.locator('//img[@title="ParaBank"]');

    //Locate the Parabank caption by using syntax 2. 
    await page.locator('//p[text()="Experience the difference"]');

    //Locate the Parabank logo by using syntax 3. 
    await page.locator('//img[contains(@src,"logo")]');

    //Locate the Parabank caption by using syntax 4. 
    await page.locator('//p[contains(text(),"difference")]');

    //Locate the Parabank logo by using syntax 5. 
    await page.locator('//img[starts-with(@title,"Para")]');

    //Locate the Parabank caption by using syntax 6. 
    await page.locator('//p[starts-with(text(),"Experience")]');

    //Locate the Parabank caption by using syntax 7. 
    await page.locator('//p[@class="caption"][text()="Experience the difference"]');

});