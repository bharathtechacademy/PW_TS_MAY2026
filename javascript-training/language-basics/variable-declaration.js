// Syntax : Declaration Variable = Data ;

//In JavaScript, we can declare the variables by using three different keywords. 

//1.var (var will be used to declare the variable in the old version of JavaScript, we need to avoid in the latest versions)
//2.let (Let will be used to declare the values that can be reassigned or modified. )
//3.const (Const will be used to declare the values that cannot be reassigned or modified. )


// These three different variable declarations will differ mainly based on four important parameters. 

//1. Initialization 
//2. Reassignment 
//3. Re-declaration 
//4. Scope

//1. Initialization => Initialization means, Adding the value at the time of declaration 
var a; // It's not mandatory to initialize at the beginning. We can add later as well. 
let b; // It's not mandatory to initialize at the beginning. We can add later as well. 
const c = 10; //It is mandatory to initialize the value at the beginning. 

//2. Reassignment => Modify the original value. 
a = 20;//var will allow reassignment. 
b = 30;//let will allow reassignment. 
// c = 40;//const won't allow reassignment. 

//print the values
console.log(a);
console.log(b);
console.log(c);

//3. Re-declaration  => Using the same variable to store some other data by re-declaring it 
var a = "Bharath"; // var allows redeclaration. 
// let b = "Sarath"; //let won't allow re-declaration 
// const c = "Vikas";//const won't allow re-declaration 

//print the values
console.log(a);
console.log(b);
console.log(c);

//4. Scope  => Accessing the data out of the block or within the block.

//let and const are block-scoped, which means they are only accessible within the block they are defined in.
//var is not block-scoped

{
    var x = 10;
    let y = 20;
    const z = 30;

    //print the values
    console.log("Inside the Block");
    console.log(x);
    console.log(y);
    console.log(z);
}

//print the values
console.log("Outside the Block");
console.log(x);
console.log(y);
console.log(z);