//Syntax to store data : Declaration variable = data ;

//Variable is all about the name of the location where we are storing the data. 

//Rules to declare a variable while storing the data 

//String data in JS
let empName = "Bharath Reddy";

//1. Variable name must not be a reserved keyword. 
// let const = "Bharath Reddy";

//2. Variable name must not be a literal. (true, false, null, undefined)
// let true = "Bharath Reddy";

//3. Variable name must not start with a number.
// let 1empName = "Bharath Reddy";

//4. Variable name must not contain special characters except $ and _.
// let emp@Name = "Bharath Reddy";

//5. Variable name must not contain spaces.
// let emp Name = "Bharath Reddy";

//6. Variable should be unique always. 
// let empName = "Sarath Reddy";


//Standarrds to be followed while declaring a variable

//1. Variable name should be meaningful and self-explanatory. 
let c = 2233; //Not a good variable name
let carNumber = 2233; //Good variable name

//2. Variable name should follow below naming conventions : camelCase, PascalCase, Underscore_case
//Regular variables, methods, or functions are to be declared using camel case. (languageBasicsOfJavaScript)
//Constant values should be declared with underscore_case with complete upper case characters. (PI_VALUE , COMPANY_NAME)
//Class name should follow Pascal case. (LanguageBasicsOfJavaScript)