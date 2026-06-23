//CSS Locators  : CSS Locator is all about locating the web element by using CSS properties. 

//CSS Locator Syntaxes

//Syntax 1 : tagName#id
//Syntax 2 : tagName.className
//Syntax 3 : tagName[attribute="attribute-value"]
//Syntax 4 : tagName[attribute*="attribute-value"] //* refers contains
//Syntax 5 : tagName[attribute^="attribute-value"] //^ refers starts with
//Syntax 6 : tagName[attribute$="attribute-value"] //$ refers ends with
//Syntax 7 : tagName[attribute="attribute-value"] [attribute2="attribute-value2"] //Multiple attributes

//Syntax 8 : Advanced CSS Locator with Relationships : tagName[attribute="attribute-value"] > tagName[attribute="attribute-value"] 
//Grand-Parent > Parent > Child

// target -> parent -> grand-parent

//target : a[href="services.htm"]
//parent : li
//grand-parent : ul[class="leftmenu"]

// ul[class="leftmenu"] > li > a[href="services.htm"]

import { test, expect } from '@playwright/test';

test('CSS Locators', async ({ page }) => {

    //Launch the Google application. 
    await page.goto('https://www.google.com/');

    //Locate the 'Google search' text box using syntax 1. 
    await page.locator('textarea#APjFqb');

    //Locate the 'Google search' text box using syntax 2. 
    await page.locator('textarea.gLFyf');

    //Locate the 'Google search' text box using syntax 3. 
    await page.locator('textarea[title="Search"]');

    //Locate the 'How Search Works' text box using syntax 4. 
    await page.locator('a[href*="howsearchworks"]');

    //Locate the 'Google search' text box using syntax 5. 
    await page.locator('textarea[title^="Sea"]');

    //Locate the 'Google search' text box using syntax 6. 
    await page.locator('textarea[title$="rch"]');

    //Locate the 'Google search' text box using syntax 7. 
    await page.locator('textarea[title="Search"][aria-label="Search"]');

    //Launch the Parabank application. 
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    //Locate the 'Services' link using syntax 8.
    await page.locator('ul.leftmenu > li > a[href="services.htm"]');


});