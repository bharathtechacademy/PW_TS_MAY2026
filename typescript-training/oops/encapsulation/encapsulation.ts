//Encapsulation in TypeScript => Concept of Hiding the information. 

//Main Class
class Person {
    private name: string = "Bharath Reddy";
    private age: number | null = null;
    private city: string = "Hyderabad";

    //method to access data with in the class
    printEmpData() {
        console.log("accessing data with in the class");
        console.log(this.name);
        console.log(this.age);
        console.log(this.city);
    }

    //method to get the private data
    public getAge() {
        return this.age;
    }

    //method to get the private data
    public setAge(age: number) {
        this.age = age;
    }
}

//Outside Class
class Outside {

    //method to access data outside of the  class
    printEmpData() {
        console.log("accessing data out side of the Main class");
        let obj = new Person();
        console.log(obj.getAge());
    }

}

let obj1 = new Person();
obj1.printEmpData();
obj1.setAge(35);
obj1.printEmpData();
