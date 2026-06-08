//Access Modifier in TypeScript ==> set of keywords used to control the access of data and methods stored inside the class. 

// Mainly, there are three different access modifiers we have in TypeScript. 

// 1. public / no keyword  => We can access from everywhere (within the class, child class and outside class)
// 2. protected => We can access from within the class and child class but we can't access from outside of the class.
// 3. private => We can access only within the class

//Main Class
class Person {
    private name: string = "Bharath Reddy";
    private age: number = 35;
    private city: string = "Hyderabad";

    //method to access data with in the class
    printEmpData() {
        console.log("accessing data with in the class");
        console.log(this.name);
        console.log(this.age);
        console.log(this.city);       
    }

    //method to get the private data
    public getAge(){
        return this.age;
    }
}

//Child Class
class Child extends Person{

       //method to access data with in the child class
        printEmpData() {
        console.log("accessing data with in the Child class");
        // let obj = new Person();
        console.log(this.name);
        console.log(this.age);
        console.log(this.city);       
    }

}

//Outside Class
class Outside {

        //method to access data outside of the  class
        printEmpData() {
        console.log("accessing data out side of the Main class");
        let obj = new Person();
        // console.log(obj.name);
        // console.log(obj.age);
        // console.log(obj.city);   
         console.log(obj.getAge());    
    }

}

let obj1 = new Person();
obj1.printEmpData();
let obj2 = new Child();
obj1.printEmpData();
let obj3 = new Outside();
obj1.printEmpData();
