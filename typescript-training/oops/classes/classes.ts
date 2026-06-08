//Create employee class. 

class Employee {
   
    //properties
    empId: number = 1234;
    empName: string = "John Doe";
    empDept: string = "IT";

    //method
    empProjectInfo():void{
        console.log("Employee is working on a Playwright project.");
    }

}

//Access the data from the class. 
let obj = new Employee();
console.log(obj.empId);
obj.empProjectInfo();
