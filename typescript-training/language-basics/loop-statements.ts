//Loop Statements : Loop the statements Or Execute the same statement multiple times until the condition is satisfied. 

let name: string = "Darshan";

//Before Loops
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);
// console.log(name);

//Loop statements are mainly divided into two different categories. 

//1. for loop => When we know the total number of iterations to be executed beforehand 

//1. for loop 
//Syntax : for(condition-to-start; condition-to-end; increment/decrement) {
//  //statements to be executed
//}

for (let i: number = 1; i <= 10; i++) {
    console.log(i + " " + name);
}

//2. while loop => When we do not know the total number of iterations to be executed before itself
//syntax:
// while(condition-to-begin){
//      //statements to be executed
// if(condition-to-end) {
//     break;
// }
// }

let j: number = 1;
let isPageLoaded: boolean = false;

while (j > 0) {

    if (isPageLoaded || j > 10) {
        break;
    }
    console.log("Refresh the Page");
    j++;
}



//Special cases of loops. 
//1. for...in loop => used to iterate over the properties of an object.
//2. for...of loop => used to iterate over the values of an iterable object like array, string, etc.
//3. do...while loop => used to execute the block of code at least once and then repeat the loop as long as the specified condition is true.

//Array
let fruits: string[] = ["apple", "mango", "grapes"];

//normal for loop
for (let i: number = 0; i <= fruits.length - 1; i++) {
    console.log(fruits[i])
}

//for..of loop ==> Each and every value of the given list 
// for (let variable of list){
//     //statements to execute
// }
for (let abc of fruits) {
    console.log(abc);
}

//for..in loop
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

//for(let key in object){
//statements to execute
//}

for (let key in person) {
    console.log(key);
    console.log(person[key as keyof personInfo]);
}

//do...while loop
//syntax:
// do{
//     //statements to execute
// }while(condition-to-continue);

console.log("=======DO-WHILE=======")
let x: number = 0;

do {
    console.log("Refresh the Page")
    // x++;
} while (x > 0)