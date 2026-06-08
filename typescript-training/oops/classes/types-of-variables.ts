//Types of variables in TypeScript Classes

//1. Local variable => The variable declared inside the method .
//2. Instance variable => The variable is declared outside of the method but inside the class. 
//3. Static variable => The variable declared outside of the method but inside the class along with the static keyword 
//4. Global Variable => The variable declared outside of the class 


let companyName: string = "Tech Solutions"; //Global variable

class Employee {

    empName: string = "Bharath"; //Instance variable
    static empId: number = 123; //Static variable
    printEmpDetails() {
        let empSalary: number = 50000; //Local variable
        console.log(companyName);
        console.log(`Employee Name: ${this.empName}, Employee Salary: ${empSalary}, Employee ID: ${Employee.empId}`);
    }
}

let obj = new Employee();
console.log(obj.salary); // Error: Property 'salary' does not exist on type 'Employee'.
console.log(obj.empName); // Accessing instance variable using object
console.log(companyName); //Accessing global variable without creating any object 
console.log(Employee.empId);//Accessing the static variable without creating an object instead will take a reference to the class name. 
