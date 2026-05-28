//Jumping statements 

//There are mainly three important jumping statements we are going to use in JavaScript and TypeScript. 
//1. break 
//2. continue

//3. return  => Written will be used inside the function to write the output wherever we are going to write the keyword "written", 
// that is, the last line of execution of any function. 


//1. break  ==> Break keyword used to break the loop completely 
//2. continue ==> Stop the current iteration and move to the next iteration. 

for (let i: number = 1; i <= 10; i++) {
    if(i===5){
       // break; //Break the entire loop when i is equal to 5, and it will come out of the loop. 
       continue; //It will stop the current iteration when i equals 5, and it will move to the next iteration. 
    }
    console.log(i);
}