//Conditional statements => Statements (line of code) along with Conditions 

//There are mainly two important conditional statements available in JavaScript or TypeScript. 

//1. If-else conditional statement ==> The if-else conditional statement will be used when we don't know the result of the condition before. 
//2. Switch-case conditional statement ==> Switch case conditional statement will be used to choose one of the options among multiple. 

//if-else conditional statement

//Syntax of if-else conditional statement
/*
if(condition){
    //code to be executed when the condition is true
}else if(condition){
    //code to be executed when the condition is true
} else if(condition){
    //code to be executed when the condition is true
} else {
    //code to be executed when all the above conditions are false
}
*/

//Syntax of nested if-else conditional statement
/*
if(condition){
    //code to be executed when the condition is true
    if(condition){
        //code to be executed when the condition is true
    } else {
        //code to be executed when the condition is false
    }
} else {
    //code to be executed when the condition is false
}
*/

//Example of if-else conditional statement

let percentage: number = 95;

if (percentage >= 90) {
    console.log("Grade A");
} else if (percentage >= 80) {
    console.log("Grade B");
} else if (percentage >= 70) {
    console.log("Grade C");
} else {
    console.log("Grade D");
}

//Example of nested if-else conditional statement

if (percentage >= 90) {
    console.log("Grade A");
    if (percentage >= 95) {
        console.log("Hey Buddy, You will get gold medal");
    } else {
        console.log("Hey Buddy, You will get silver medal");
    }
} else if (percentage >= 80) {
    console.log("Grade B");
} else if (percentage >= 70) {
    console.log("Grade C");
} else {
    console.log("Grade D");
}

//Switch-case conditional statement

//Syntax of switch-case conditional statement
/*
switch(expression){
    case value1:    
    break;
    case value2:
    break;
    case value3:
    break;
    default:
}
*/

//Example of switch-case conditional statement

let env: string = "qa";

switch (env) {
    case "dev":
        console.log("launch the application with dev.amazon.com");
        break; //break keyword is used to exit from the switch-case block when the case is matched.
    case "qa":
        console.log("launch the application with qa.amazon.com");
        break;
    case "prod":
        console.log("launch the application with amazon.com");
        break;
    default:
        console.log("Please provide the correct environment");
}