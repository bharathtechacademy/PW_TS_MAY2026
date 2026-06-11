//Callback function => Calling the function after some time 

//Function to get sum of unlimited numbers based on the input from 1 to the given number. 
function sumOfNumbers(input: number): number {
    let sum = 0;
    for (let i = 1; i <= input; i++) {
        sum += i;
    }
    return sum;
}

//Calling the callback function inside the code. 
console.log("Execution Started");
console.log("Line 2 executed Successfully");
console.log("Line 3 executed Successfully");
console.log("Line 4 executed Successfully");
setTimeout(() => {
    console.log(sumOfNumbers(10000000000));
}, 5000);
console.log("Line 6 executed Successfully");
console.log("Line 7 executed Successfully");
console.log("Execution Completed Successfully");