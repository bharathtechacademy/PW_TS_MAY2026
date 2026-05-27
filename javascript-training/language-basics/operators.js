//Syntax to store data : Declaration variable = data ;

//Operators => Operators are nothing but special characters used in JavaScript to perform different types of operations. 

//There are 5 different types of operators in JavaScript. 

//1. Arithmetic operators 
//2. Assignment Operators 
//3. Comparison Operators 
//4. Logical Operators 
//5. Ternary Pperator 


//1. Arithmetic operators => The special characters used to perform mathematical operations in JavaScript (+ , - , * , / , % , ++ , --)
// + Addition 
// - Subtraction 
// * Multiplication. 
// / Division 
// % Modulus (Returns the remainder of division operations. ) (9 % 3 = 0), (5%2 = 1)
// ++ Increment  (Increase the value by one. , for ex: a= 10; then a++ => a+1 = 10+1 = 11)
// -- Decrement  (Decrease the value by one. , for ex: b = 5, then b-- => b-1 = 5-1 = 4 )

let a = 10;
let b = 20;

//Placement of ++ and -- also will decide the final output. 

//If ++ /-- is written on the right side of the variable  (a++, b--), It will be treated as post increment or decrement. (post execution of line, increse /decrese)
console.log(a++);
console.log(b--);
console.log(a);
console.log(b);

let c = 10;
let d = 20;

//If ++ /-- is written on the left side of the variable  (++c, --d), It will be treated as pre increment or decrement. (first increse/decrese ,then execute)
console.log(++c);
console.log(--d);


//2. Assignment Operators : Special characters used to assign values to the variable (= , +=, -= , *= , /=, %=)
let i = 10;
console.log("Initial value of i : "+ i);

i+=10; // i = i+10 = 10+10 = 20;
console.log("After using += then, value of i : "+ i);

i-=10; // i = i-10; 20 -10 = 10;
console.log("After using -= then, value of i : "+ i);

i*=10; // i = i*10; 10 *10 = 100;
console.log("After using *= then, value of i : "+ i);

i/=10; // i = i/10; 100/10 = 10;
console.log("After using /= then, value of i : "+ i);

i%=10; // i = i%10; 10%10 = 0;
console.log("After using %= then, value of i : "+ i);


//3. Comparison operators : Special characters used to compare two values and write Boolean as a result (==, ===, !=,  > , < , >= , <=)
//== Represents loose equality (Lose equality compares only data. )
//=== Represents strict equality (Strict equality compares data along with its data type. )
let x = 10;
let y = 10;
let z = "10";//When we write any value inside the double quotations, it will be treated as text, not a number. 

console.log(x==y); //true
console.log(x==z); //true

console.log(x===y); //true
console.log(x===z); //false

console.log(x!=z); //false
console.log(x>y); //false
console.log(x<y); //false
console.log(x>=y); //true
console.log(x<=y); //true

//4. Logical Operators : Special characters used to combine two or more conditions and write Boolean as a result (&& , || , !)
//&& Logical AND (Returns true if both conditions are true. )
//|| Logical OR (Returns true if at least one condition is true. )
//! Logical NOT (Returns the opposite of the condition. )

let p = 10;
let q = 20;

console.log(p>5 && q>15); //true && true => true
console.log(p>15 && q>15); //false && true => false

console.log(p>5 || q>15); //true || true => true
console.log(p>15 || q>15); //false || true => true

console.log(!(p>5)); // !(true) => false

//5. Ternary Operator : Special character used to write a condition in a single line /shorthand of if/else  ( ?)

//Syntax : let result = condition ? value if true : value if false;

let age = 17;
let result = (age>=18) ? "eligible" : "not eligible";
console.log(result);