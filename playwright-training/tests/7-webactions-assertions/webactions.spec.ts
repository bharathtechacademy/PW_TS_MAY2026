import { test, expect } from '@playwright/test';

test('Web Actions and Assertions', async ({ page }) => {

     // Navigate to the web page
     await page.goto('https://example.com');

     // Locate the web element. 
     const element = page.locator('h1');

     /* ================================================
              Common Web Element Validations
   ==================================================== */

     //Check if the element is visible. 
     const isElementVisible = await expect(element).toBeVisible();

     //Check if the element is enabled.
     const isElementEnabled = await expect(element).toBeEnabled();

     //Check if the element is already selected (if it is a checkbox.)
     const isElementChecked = await expect(element).toBeChecked();

     //Check if the element is disappeared. 
     const isElementHidden = await expect(element).toBeHidden();

     /* ================================================
          Button Element Validations
     ==================================================== */

     // Locate the button element. 
     const button = page.locator('button#id');

     //Verify the label of the button. 
     const buttonLabel = await button.textContent();//The label is added as a text value. 
     const buttonLabelValue = await button.getAttribute('value');//The label is added as a value attribute.
     await expect(buttonLabel).toBe('Submit');
     await expect(buttonLabelValue).toBe('Submit');

     //Click on the button. 
     await button.click();

     //Right click on the button. 
     await button.click({ button: 'right' });

     //Double click on the button.
     await button.dblclick();

     //Mouse over on the button. 
     await button.hover();

     //Scroll to the button and then click. 
     await button.scrollIntoViewIfNeeded();

     //Force click on the button if the button is not responding or in a disabled state. 
     await button.click({ force: true });

     //Drag and drop the button to another element.
     const targetElement = page.locator('div#target');
     await button.dragTo(targetElement);


     /* ================================================
          Textbox Element Validations
     ==================================================== */

     // Locate the textbox element. 
     const textbox = page.locator('input#id');

     //Verify the placeholder of the text box. 
     const placeholder = await textbox.getAttribute("placeholder");
     await expect(placeholder).toBe("First Name");

     //Clear the text if there is any text already there. 
     await textbox.clear();

     //Type the text into the text box. 
     await textbox.fill("Bharath");

     //Verify the text entered into the text box. 
     const text = await textbox.getAttribute("value");
     await expect(text).toBe("Bharath");

     //Press the function keys within the text box. 
     await textbox.press('Enter');
     await textbox.press('Control+A');

     /* ================================================
      Checkbox Element Validations
 ==================================================== */

     // Locate the checkbox element. 
     const checkbox = page.locator('input[type="checkbox"]');

     //Check the checkbox if it is not checked already. 
     const isChecked = await checkbox.isChecked();
     if (!isChecked) {
          await checkbox.check();
     }


     /* ================================================
      Radiobutton Element Validations
 ==================================================== */

     // Locate the radio element. 
     const radio = page.locator('input[type="radio"]');

     //Check the radio button
     await radio.check();

     /* ================================================
 Dropdown Element Validations
==================================================== */

     // Locate the dropdown element. 
     const dropdown = page.locator('select#dropdown');

     //Select one of the options from the dropdown. 
     await dropdown.selectOption({ label: 'Available Funds' });
     await dropdown.selectOption({ value: 'funds' });
     await dropdown.selectOption({ index: 0 });

     //Verify the options selected from the drop-down. 
     const selectedOption = await dropdown.inputValue();
     await expect(selectedOption).toBe("Available Funds");

     //Extract all the options available in the drop-down. 
     const options = await dropdown.locator('option').allTextContents();
     const expectedValues = ['Available Funds', 'Down Payment', 'Combined'];
     await expect(options).toEqual(expectedValues);

     //Verify whether the dropdown is a multi-select dropdown. 
     const isMultiSelect = await dropdown.getAttribute('multiple');
     if (isMultiSelect !== null) {
          await dropdown.selectOption({ label: 'Available Funds' });
          await dropdown.selectOption({ value: 'funds' });
          await dropdown.selectOption({ index: 0 });
     }

     //deselect the options from the dropdown.
     await dropdown.selectOption({ label: 'Available Funds' });
     await dropdown.selectOption({ value: 'funds' });
     await dropdown.selectOption({ index: 0 });

     /* ================================================
Image Element Validations
==================================================== */

     // Locate the image element. 
     const image = page.locator('img#id');

     //Verify the image is displayed within the page
     await expect(image).toBeVisible();

     //Verify whether the image is valid or not by using Image Source Path. 
     const actualImagePath = await image.getAttribute("src");
     const expectedPath = "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg";
     await expect(actualImagePath).toBe(expectedPath);

     //Verify the image size or resolution. 
     const imageSize = await image.boundingBox();
     const width = imageSize?.width;
     const height = imageSize?.height;

     //Verify the position of the image within the application. 
     const imagePosition = await image.boundingBox();
     const x = imagePosition?.x;
     const y = imagePosition?.y;


     /* ================================================
Hyperlink Element Validations
==================================================== */

     // Locate the hyperlink element. 
     const hyperlink = page.locator('a#id');

     //Verify the hyperlink by using hyperlink reference value. 
     const actualLink = await hyperlink.getAttribute('href');

     //Verify the hyperlink by navigating to the page and getting the URL. 
     await hyperlink.click();
     // const newPage = await page.waitForEvent('popup');
     const link = await PageTransitionEvent.url();

     /* ================================================
Text /Header/Label Element Validations
==================================================== */

     // Locate the text/header/label element. 
     const textElement = page.locator('selector-for-text-element');

     //Verify the text content of the element.
     const actualText = await textElement.textContent();
     const expectedText = 'Expected Text Content';
     await expect(actualText).toBe(expectedText);


     /* ================================================
upload file Element Validations
==================================================== */

     // Locate the file input element. 
     const fileInput = page.locator('input[type="file"]');

     //Upload a file to the input element.
     await fileInput.setInputFiles('relative/path/to/file.txt');//./tests/5-browser-actions/browser-actions.spec.ts


     /* ================================================
Window Alert Element Validations
==================================================== */

     //Locate the button that triggers the alert.
     const alertButton = page.locator('button#alertButton');

     //If an alert comes, specify the action to be done. 
     page.once('dialog', async dialog => {

          //Copy the message from the alert. 
          const alertMessage = dialog.message();

          //Click on the OK button within the alert. 
          await dialog.accept();

          //Click on the Cancel button within the alert. 
          await dialog.dismiss();

          //Enter the text within the alert, then click on the accept button. 
          await dialog.accept('text-to-eter')
     })

     //Click on the button and get the alert. 
     await alertButton.click();

     /* ================================================
Frame Element Validations
==================================================== */

     //Locate the main page element that contains the frame. 
     const mainFrameElement = page.frameLocator('iframe#frame1');

     //Locate the frame element.
     const frameElement = await mainFrameElement.locator('div#frameElement');

});