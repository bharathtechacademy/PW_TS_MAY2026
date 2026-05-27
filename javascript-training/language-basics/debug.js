console.log("Executing Line 1");
console.log("Executing Line 2");
console.log("Executing Line 3");
sumOfNumbers(5,10);
console.log("Executing Line 5");
console.log("Executing Line 6");
console.log("Executing Line 7");
console.log("Executing Line 8");
console.log("Executing Line 9");
console.log("Executing Line 10");



//Debugging the program in JavaScript step-by-step 

//1. Add the breakpoint  (Click on a specific line number where you want to start the debugging process.)
//2. Run the program in the debug mode. (Cntrl+Shift+D)
//3. Use the debug options to identify and fix the error. 

// continue(f5) => Executes the program until the next breakpoint 
// Restart (Cntrl+Shift+F5) => Restart the program from the beginning. 
// Stop (Shift+F5) => Stop the execution and terminate the flow. 
// Step Over => Execute current line and move to next line. 
// Step Into => Go inside the step and understand the background logic.
// Step Out => Come out of the background step and go to the main flow.  















//Logic to get the sum of two numbers
function sumOfNumbers(a, b) {
    c= a + b;
    console.log(c);
}