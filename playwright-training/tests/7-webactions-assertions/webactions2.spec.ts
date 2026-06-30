import { test, expect } from '@playwright/test';

test('Demo QA Form Validations ', async ({ page }) => {

    // 1. Enter URL and Launch the application (https://demoqa.com/automation-practice-form)
    await page.goto("https://demoqa.com/automation-practice-form");

    // 2. Wait for Page-load
    const pageHeader = await page.locator('//h1[text()="Practice Form"]');
    await expect(pageHeader).toBeVisible();

    // 3. Enter First name and Last name
    const firstName = await page.getByPlaceholder("First Name");
    const lastName = await page.locator('//input[@id="lastName"]');
    await firstName.fill("Bharath");
    await lastName.fill('Reddy');

    // 4. Enter Email
    const email = await page.locator('//input[@id="userEmail"]');
    await email.fill('BharathtechAcademy@gmail.com');

    // 5. Select Gender (Male)
    await selectGender(page, "Male");

    // 6. Enter mobile number
    const mobile = await page.locator('//input[@id="userNumber"]');
    await mobile.fill("9553220022");

    // 7.Select DOB (1-Feb-1991)
    await selectDOB(page, "1" , "February", "1991");

    // 8.Search and Select Computer Science and English
    const subjects :string[] = ["Computer Science", "English"];
    await selectSubjects(page, subjects);

    // 9.Select Hobbies as Sports and Reading
    const hobbies :string[] = ["Sports", "Reading"];
    await selectHobbies(page, hobbies);

    // 10.Upload photo
    const uploadPhoto = await page.locator('//input[@id="uploadPicture"]');
    const filePath = "files/Photo.png";
    await uploadPhoto.setInputFiles(filePath);

    // 11.Submit Details
    const submitButton = await page.locator('//button[@id="submit"]');
    await submitButton.click();

});

async function selectHobbies(page: any, options: string[]): Promise<void> {
    for (const option of options) {
        const hobby = await page.locator(`//label[text()="${option}"]`);
        await hobby.click();
    }
}

async function selectSubjects(page: any, options: string[]): Promise<void> {
   
    //Locate the Subject Input box and click on it. 
    const subjectInput = await page.locator('div[class*="subjects-auto-complete__input-container"]');
    subjectInput.click();

    //Locate the subject input suggestion box. 
    const subject = await page.locator('//input[@id="subjectsInput"]');

    //Select a subject provided in the array. 
    for (const option of options) {
        
        //Fill the subject 
        await subject.fill(option);

        //Press Enter to select the subject from the suggestion box.
        await subject.press('Enter');
    }
}

async function selectGender(page: any, option: string): Promise<void> {
    const gender = await page.locator(`//label[text()="${option}"]`);
    await gender.click();
}

async function selectDOB(page: any, date: string, month: string, year: string): Promise<void> {

    //Click on the date of birth input field and then click on the same to open the calendar. 
    const dobInput = await page.locator('//input[@id="dateOfBirthInput"]');
    await dobInput.click();

    //Select month from the month dropdown. 
    const monthDropdown = await page.locator('//select[@class="react-datepicker__month-select"]');
    await monthDropdown.selectOption({ label: month })

    //Select year from the year dropdown. 
    const yearDropdown = await page.locator('//select[@class="react-datepicker__year-select"]');
    await yearDropdown.selectOption({ label: year })

    //Select date from the calendar. 
    const dateField = await page.locator(`//div[contains(@aria-label,"${month}") and text()="${date}"]`);
    await dateField.click();
}