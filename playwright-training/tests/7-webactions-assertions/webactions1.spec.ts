import { test, expect } from '@playwright/test';

test('Parabank Homepage Validations ', async ({ page }) => {

    // 1. Launch application using url (https://parabank.parasoft.com/parabank/index.htm)
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    // 2.verify application logo is displayed
    const logo = await page.locator('img[class="logo"]');
    await expect(logo).toBeVisible();
    console.log("Parabank application logo is successfully displayed. ");

    // 3.Verify application caption displayed as "Experience the difference"
    const caption = await page.locator('p[class="caption"]');
    const expectedCaption: string = "Experience the difference";
    const actualCaption: string = await caption.textContent();
    await expect(actualCaption).toBe(expectedCaption);
    await expect(caption).toHaveText(expectedCaption);
    console.log("Parabank caption is displayed as expected. ")

    // 4.Enter invalid username
    const username = await page.locator('input[name="username"]');
    await username.fill("invalidUser");
    console.log("Updated user name ");

    // 5.Enter empty Password
    const password = await page.locator('input[name="password"]');
    await password.fill("");
    console.log("Updated password successfully. ");

    // 6.Click on login button
    const loginButton = await page.locator('input[value="Log In"]');
    await loginButton.click();
    console.log("Clicked on the login button ");

    // 7.Verify the error message "Please enter a username and password."
    const errorMessage = await page.locator('p[class="error"]');
    await expect(errorMessage).toHaveText("Please enter a username and password.");
    console.log("Error message is displayed as expected. ");

    // 8.Click on admin page link
    const adminPageLink = await page.locator('//a[text()="Admin Page"]');
    await adminPageLink.click();
    console.log("Successfully navigated to admin page. ");

    // 9.select the option "soap" from dba mode radio button
    await selectAccessMode(page, "soap");

    // 10.Scroll to element dropdown
    const loanProvider = await page.locator('select[name="loanProvider"]');
    await loanProvider.scrollIntoViewIfNeeded();
    console.log("Scrolled down till the loan provider dropdown element. ");

    // 11.Select the option web service from the dropdown
    await loanProvider.selectOption({label:'Web Service'});
    console.log(`Selected loan provider option as Web Service`);

    // 12.click on submit button
     const submitButton = await page.locator('input[value="Submit"]');
     await submitButton.click();
     console.log("Click on the submit button. ");

    // 13.verify submission is successful by validating success message
    const successMessage = await page.locator('//b[text()="Settings saved successfully."]');
    await expect(successMessage).toBeVisible();
    console.log("Details successfully submitted. ");

    // 14.Click on services page link
     const servicesLink = await page.locator('//ul[@class="leftmenu"]//a[@href="services.htm"]');
     await servicesLink.click();
    console.log("Clicked on the services link");

    // 15.wait for service page
    const bookstoreServices = await page.locator('//span[text()="Bookstore services:"]');
    await expect(bookstoreServices).toBeVisible();
    console.log("Bookstore services section is visible. ");

    // 16.Scroll down till bookstore services table
    await bookstoreServices.scrollIntoViewIfNeeded();

    // 17.get total rows of books store services table
    const rows = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tbody//tr');
    const totalRows =await rows.count();

    // 18.get total columns of books store services table
    const columns = await page.locator('//span[text()="Bookstore services:"]/following-sibling::table[1]//tbody//tr[1]//td')
    const totalColumns = await columns.count();
   
    // 19.Print table data (row wise and column wise data)
    for(let r:number = 1; r<=totalRows ;r++){
        for(let c:number=1; c<=totalColumns ;c++){
            const cell = await page.locator(`//span[text()="Bookstore services:"]/following-sibling::table[1]//tbody//tr[${r}]//td[${c}]`);
            const cellData = await cell.textContent();
            console.log(`Row ${r} Column ${c} data is : ${cellData}`);
        }
    }

});

async function selectAccessMode(page: any, option: string): Promise<void> {
    const dbaMode = await page.locator(`input[value="${option}"]`);
    await dbaMode.click();
    console.log(`Selected option from dba mode radio button is : ${option}`);
}