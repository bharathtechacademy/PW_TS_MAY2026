// Test Case 1: verify the home page.
console.log("******************TEST CASE 1: VERIFY THE HOME PAGE******************");
loginToApplication("Chrome", "https://qa.icici.com/");
console.log("Verify the home page is displayed or not");
logoutAndCloseBrowser();

// Test Case 2: verify the account balance
console.log("******************TEST CASE 2: VERIFY THE ACCOUNT BALANCE******************");
loginToApplication("Firefox", "https://www.icici.com/");
console.log("Verify the home page is displayed");
console.log("Verify the account balance is displayed as " + getAccountBalance("Savings"));
logoutAndCloseBrowser();

// Test Case 3: verify the account statement
console.log("******************TEST CASE 3: VERIFY THE ACCOUNT STATEMENT******************");
loginToApplication("Edge", "https://www.icici.com/");
console.log("Verify the home page is displayed");
console.log("Navigate to the account statement page");
console.log("Verify the account statement is displayed with the following details:");
logoutAndCloseBrowser();

function loginToApplication(browser, url) {
    console.log(`Launch the ${browser} Browser`);
    console.log(`Enter the URL: ${url}`);
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
}

function logoutAndCloseBrowser() {
    console.log("Logout from the application");
    console.log("Close the browser");
}

function getAccountBalance(accountType) {
    console.log(`Navigate to the ${accountType} account balance page`);
    let accountBalance = 100000;
    return accountBalance;
}

//1. Identify the duplicate code and separate the same from the program.
//2. Add the duplicate code inside the curly braces.
//3. Add a unique function name to call wherever it is required. (ex:function loginToApplication(), logoutAndCloseBrowser())