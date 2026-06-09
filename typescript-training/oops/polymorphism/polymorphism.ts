//Polymorphism is the concept of having multiple implementations for the single method. 

//In other languages, we usually have two different types of polymorphism. 

//1. Compile time polymorphism (Method overloading)
//2. Runtime polymorphism (Method overriding)


//In TypeScript, we can achieve only runtime polymorphism. Compile time polymorphism is not supported in TypeScript.

//1. Compile time polymorphism (Method overloading)
//Creating multiple methods within the same class with the same name but different parameters 


//2. Runtime polymorphism (Method overriding)


class Calculator {

    // Compile time polymorphism (Method overloading) is not supported in TypeScript. We can achieve it using function overloading.
    // add(a: number, b: number): number {
    //     return a + b;
    // }

    // add(a: string, b: string): string {
    //     return a + b;
    // }

    // Runtime polymorphism (Method overriding) is supported in TypeScript. We can achieve it using inheritance and method overriding.
    sum(a: number, b: number): number {
        return a + b;
    }

}

class AdvancedCalculator extends Calculator {

    // Overriding the sum method of the Calculator class
    sum(a: number, b: number): number {
        return a + b + 10; // Adding 10 to the result of the sum method
    }   

}

let obj = new Calculator();
console.log(obj.sum(1, 2));

let advObj = new AdvancedCalculator();
console.log(advObj.sum(1, 2));