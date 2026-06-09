//Create sample parent class. 
class Parent {

    //Parent Class Value
    course: string = "JavaScript";

    printProject() {
        console.log("ABC Project");
    }
}

//Create sample child class. 
class Child extends Parent {

    //Child Class Value
    course: string = "TypeScript";

    printProject() {
        console.log("XYZ Project");
    }

    printCourse(course: string) {
        console.log(course);
        // console.log(new Child().course);
        // console.log(new Parent().course);
        console.log(this.course);
        // console.log(super.course);
        super.printProject();
    }
}

let obj = new Child();
obj.printCourse("Playwright");