//Datatype in JavaScript are divided into two different categories. 

//1. Primitive Data Types (immutable)
//2. Non-Primitive Data Types (mutable)

//immutable
let a = 10;
a + 10;
console.log(a);

//mutable
let obj = {
    "name": "bahrath",
    "id": 1234
}

obj.age = 35 ;
console.log(obj);

/************************************************/
/***************Primitive Datatypes**************/
/************************************************/

// - number
// - string
// - boolean
// - undefined
// - null
// - symbol

// - number => The data type that can store numbers with decimals or without decimals, that too without any quotations 
let num1 = 10;
let num2 = 10.5;
console.log(typeof num1);
console.log(typeof num2);

// - string => The Datatype that can store a collection of characters within the quotations (single or double or backticks)

let employeeName = "bah'r'ath";
let  location = 'hyderabad';
let company = `luminar`; 

console.log(typeof employeeName);
console.log(typeof location);
console.log(typeof company);

console.log(employeeName);
console.log(location);
console.log(company);

console.log("Employee name is "+employeeName+" and employee location is "+location)
console.log(`Employee name is ${employeeName} and employee location is ${location}`)

// - boolean => The Datatype to store the result of the condition in the form of true or false 
let x = 10;
let y = 20;
let z = x > y ; //z will store the data in the form of boolean
console.log(typeof z);
console.log(z);

//undefined => Undefined represents a variable that has been declared but not assigned any value. 
let age;
console.log(age);

//null => Null represents a variable that has been declared and assigned a null value or empty value. 
let salary = 100000;
console.log(salary);
salary = null;
console.log(salary);

// - symbol => Symbol represents a unique hidden identifier inside an object. 
let countryOfOrigin = Symbol();
let productInfo = {
    productName: "iPhone 14 Pro Max",
    price: 120000,
    [countryOfOrigin]: "China"
}

console.log(productInfo);
/************************************************/
/***************Non-Primitive Datatypes**********/
/************************************************/

// -object  => Object data type represents a collection of key-value pairs within the curly braces. 
let person = {
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

// -array => Array represents a list of values. 
let fruits = ["apple","mango","grapes"];
let prices = [100,200,300];
let fruitsAndPrices = ["apple",100,"mango",80,"grapes",160];

//access data
console.log(fruits[1]);
console.log(fruitsAndPrices[3]);


//-function => Function data type represents a block of code or collection of statements written together to complete a specific task. 
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

// Set => Set Datatype represents a collection of unique values of any data type. 
let empIds = new Set();
empIds.add(1234);
empIds.add(5678);
empIds.add(1234);
empIds.add("1234");
console.log(empIds.size);
console.log(empIds);

// Map =>  A map represents a collection of key-value pairs together at one place. 
// -key can be of any data type, key should be unique, value can be of any data type, value can be duplicate.
let employeeDetails = new Map();
employeeDetails.set(1234,  "Bharath");
employeeDetails.set(1235, "Sarath");
employeeDetails.set(1234, "Bharath Kumar");
employeeDetails.set(1236, "Sarath");
console.log(employeeDetails.size);
console.log(employeeDetails);

//Date => Date Datatype represents the date and time together at one place.
let currentDate = new Date();
console.log(currentDate);

//Get current year. 
let currentYear = currentDate.getFullYear();
console.log(currentYear);

//Get current month.
let currentMonth = currentDate.getMonth(); //0 to 11 (0 - January, 1 - February, 2 - March, 3 - April, 4 - May, 5 - June, 6 - July, 7 - August, 8 - September, 9 - October, 10 - November, 11 - December)
console.log(currentMonth+1);

//Get current date.
let currentDay = currentDate.getDate();
console.log(currentDay);

//Get current hours.
let currentHours = currentDate.getHours();
console.log(currentHours);

//Get current minutes.
let currentMinutes = currentDate.getMinutes();
console.log(currentMinutes);

//Get current seconds.
let currentSeconds = currentDate.getSeconds();
console.log(currentSeconds);

//Get current day
let currentDayOfWeek = currentDate.getDay(); //0 to 6 (0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday)
console.log(currentDayOfWeek);