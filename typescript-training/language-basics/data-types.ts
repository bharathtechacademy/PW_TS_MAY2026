/*Data types are two different categories
1. Primitive Data Types: immutable data ==> number,String, boolean,undefined,null and symbol
2. Non-Primitive Data Types : mutable data ===>  Objects, Arrays, Functions, Date, Map and Set 
*/

/********************************************/
/************ Primitive DataTypes***********/
/********************************************/

//Numbers ==> numbers without decimals and numbers with decimal points
let empId: number = 1234;
console.log(empId);

//Text/String values ==> Sequence of chars ,we have to store inside double quotes or single quotes or back ticks
let firstName: string = "Bharath";
let lastName: string = 'Reddy';
console.log(`Name of the employee is ${firstName} ${lastName}`)

//Boolean => Boolean represents the result of a condition in terms of true or false. 
let doYouHaveVisa: boolean = true;

//Undefined : Undefined represents a variable that is declared but we haven't assigned any value. 
let age: undefined;

//null => Null represents a variable declared with an empty value intentionally. 
let empSalary: null = null;

//union => Union represents more than one data type that can be stored within the variable. 
let empAddress: string | number;
empAddress = "Hyderabad";
console.log(empAddress);
empAddress = 500081;
console.log(empAddress);

//any => Any represents any data type that can be stored within the variable.
let data: any;
data = 1234;
console.log(data);
data = "Bharath";
console.log(data);
data = true;
console.log(data);

/****************************************************/
/*******NON-PRIMITIVE DATA TYPES IN TYPESCRIPT*******/
/****************************************************/

//1.object => Object data type represents a collection of key-value pairs. 

interface personInfo {
    name: string;
    age: number;
    empId: number;
    visa: boolean;
    address: {
        city: string;
        state: string;
    }
}

let person: personInfo = {
    "name": "bahrath",
    "age": 35,
    "empId": 1234,
    "visa": true,
    "address": {
        "city": "hyderabad",
        "state": "telangana"
    }
}

//access data
console.log(person.name);
console.log(person.address.city);

console.log(person["name"]);
console.log(person.address["city"]);

console.log(person);

//Array  =>Array represents a list of values. 
let fruits: string[] = ["apple", "mango", "grapes"];
let prices: number[] = [100, 200, 300];
let fruitsAndPrices: (string | number)[] = ["apple", 100, "mango", 80, "grapes", 160];

//access data
console.log(fruits[1]);
console.log(fruitsAndPrices[3]);

//Tuples : Tuple is an ordered array that represents a list of values in a specific order. 

//Problem Statement : Store employee name, employee phone number, employee visa status together. 

//Array : 
let empDetails: (string | number | boolean)[] = ["Bharath Reddy", 9553220022, true, 500081];

//Tuples:
let empInformation: [string, number, boolean] = ["Bharath Reddy", 9553220022, true];

//-function => Function data type represents a block of code or collection of statements written together to complete a specific task. 
function loginToApplication(browser: string, url: string): void {
    console.log(`Launch the ${browser} Browser`);
    console.log(`Enter the URL: ${url}`);
    console.log("Enter the username as 'Bharath' and password as 'Bharath@123'");
    console.log("Click on the login button");
}

function logoutAndCloseBrowser(): void {
    console.log("Logout from the application");
    console.log("Close the browser");
}

function getAccountBalance(accountType: string): number {
    console.log(`Navigate to the ${accountType} account balance page`);
    let accountBalance: number = 100000;
    return accountBalance;
}

//calling the functions
loginToApplication("Chrome", "www.amazon.com");
logoutAndCloseBrowser();
let balance: number = getAccountBalance("savings");
console.log(`The account balance is ${balance}`);

// Set => Set Datatype represents a collection of unique values of any data type. 
let empIds: Set<number | string> = new Set();
empIds.add(1234);
empIds.add(5678);
empIds.add(1234);
empIds.add("1234");
console.log(empIds.size);
console.log(empIds);

// Map =>  A map represents a collection of key-value pairs together at one place. 
// -key can be of any data type, key should be unique, value can be of any data type, value can be duplicate.
let employeeDetails: Map<number, string> = new Map();
employeeDetails.set(1234, "Bharath");
employeeDetails.set(1235, "Sarath");
employeeDetails.set(1234, "Bharath Kumar");
employeeDetails.set(1236, "Sarath");
console.log(employeeDetails.size);
console.log(employeeDetails);

//Date => Date Datatype represents the date and time together at one place.
let currentDate: Date = new Date();
console.log(currentDate);

//Get current year. 
let currentYear = currentDate.getFullYear();
console.log(currentYear);

//Get current month.
let currentMonth: number = currentDate.getMonth(); //0 to 11 (0 - January, 1 - February, 2 - March, 3 - April, 4 - May, 5 - June, 6 - July, 7 - August, 8 - September, 9 - October, 10 - November, 11 - December)
console.log(currentMonth + 1);

//Get current date.
let currentDay = currentDate.getDate();
console.log(currentDay);

//Get current hours.
let currentHours: number = currentDate.getHours();
console.log(currentHours);

//Get current minutes.
let currentMinutes = currentDate.getMinutes();
console.log(currentMinutes);

//Get current seconds.
let currentSeconds: number = currentDate.getSeconds();
console.log(currentSeconds);

//Get current day
let currentDayOfWeek: number = currentDate.getDay(); //0 to 6 (0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday)
console.log(currentDayOfWeek);