//Function Implementations 

//There are multiple ways that we can implement any function to complete the specific task. 

//1. Function without parameters and without return type 
// Create a function which is not going to take any input parameters and also it won't give you any output. 
function greet(): void {
    console.log("Hello, World!");
}

//calling the function
greet();

//2. Function with parameters and without return type
// Create a function which is going to take some input parameters but it won't give you any output. 
function greetPerson(name: string): void {
    console.log(`Hello, ${name}!`);
}

//calling the function
greetPerson("Darshan");

//3. Function with parameters and with return type
// Create a function which is going to take some input parameters and also it will give you some output. 
function add(a: number, b: number): number {
    return a + b;
}

//calling the function
console.log(add(5, 3));

//4. Function without parameters and with return type 
// Create a function which is not going to take any input parameters but it will give you some output.
function getCurrentDate(): Date {
    return new Date();
}

//calling the function
console.log(getCurrentDate());

//5. Function with optional parameters
//Creating a function which is going to take some input parameters, and some of the parameters are optional to enter. 
function personDetails(name: string, age?: number): void {
    console.log(name);
    if (age)
        console.log(age);
}

//calling function
personDetails("Bharath");
personDetails("Sarath", 28);

//6. Function with default parameters
//Creating a function which is going to take some input parameters, and some of the parameters have default values.
function personInfo(name: string, age: number, visaStatus: boolean = false): void {
    console.log(name);
    console.log(age);
    console.log(visaStatus);
}

//calling function
personInfo("Sarath", 28);
personInfo("Bharath", 35 , true);

//7. Function with REST parameter 
//Creating a function that will take unlimited parameters and produce the output 
function sumOfNumbers(...numbers : number[]):number {
    let sum : number = 0;
    for(let num of numbers){
        sum+=num;
    }
    return sum;
}

//calling function
console.log(sumOfNumbers(1,2));
console.log(sumOfNumbers(1,2,3,4));