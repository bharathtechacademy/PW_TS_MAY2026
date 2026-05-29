//Function Types

//There are mainly three different types of functions available in TypeScript. 

//1. Named Functions
//2. Anonymous Functions
//3. Arrow Functions

//1. Named Functions => The functions declared explicitly with some name are called a named functions.

//Syntax:
// function functionName(parameters): returnType {
//     //function body
// }

// Example:
function add(a: number, b: number): number {
    return a + b;
}

//calling the named function
console.log(add(5, 3));

//2. Arrow Functions/Lambda Function => The function is declared without any name, and the implementation will be written after a row mark. 

//Syntax:
// (parameters) => {
//     //function body
// }

//Example:
let sum = (a: number, b: number) => (a + b);

//calling arrow function
console.log(sum(5, 3));

//3. Anonymous Function => The function declared without a name and the function that we are going to use as a parameter for another function 
//Syntax : function functionName(function-as-parameter): returnType{
//code to execute
//}

// Example:

function calculator2(x: number): void {
    console.log(x * x);
}

//calling function
calculator2(5);

//Creating function and added parameters as "square : (x: number) => number"
function calculator(square: (x: number) => number): void {
    console.log(square(10));
}


//calling function
calculator(

    function (a: number): number {
        return a * a;
    }

);

//Example 2:

function newCalculator(greeting: (x: string) => string): void {
    console.log(greeting("Bharath Reddy"));
}


newCalculator(

    function(name:string): string {
        return "Good Morning "+name;
    }

);

