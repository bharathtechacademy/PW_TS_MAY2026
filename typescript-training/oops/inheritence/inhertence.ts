//Inheritance : 

//1. Single Inheritance ==> Child extends Parent
//2. Multiple Inheritance => Child extends Parent1 , Parent 2 (not supported in TypeScript)
//3. Multi-level Inheritance => Child extends Parent and Parent extends GrandParent
//4. Hirarchical Inheritance => Child1 extends Parent, Child2 extends Parent

//grand-parent class
class Class1{
    empName:string ="Bharath Reddy";
    empId:number = 1234
}

//parent class
class Class2 extends Class1{
    empSalary:number = 50000;
}

//child class
class Class3 extends Class2{
    empProject:string = "Creatio CRM";
}

let obj = new Class3();
console.log(obj.empName);
console.log(obj.empId);
console.log(obj.empSalary);
console.log(obj.empProject);