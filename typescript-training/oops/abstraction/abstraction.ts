//Abstraction is the concept of hiding the implementation. 

abstract class CommonMethods {

    //Method : A method is all about a block of code or a collection of statements written together to complete a specific task. 

    launchApplication() :void {
        console.log("Launch the browser. ")
        console.log("Enter the URL: www.google.com ")
        console.log("Launch the application. ")
    }

    // loginIntoApplication():void {
    //     console.log("Enter the username. ")
    //     console.log("Enter the password. ")
    //     console.log("Click on the login button. ")
    // }

    // logoutFromApplication():void {
    //     console.log("Click on the profile icon. ")
    //     console.log("Click on the logout button. ")
    // }

    abstract loginIntoApplication(username: string, password: string):void;

    abstract logoutFromApplication():void;

}

class Google extends CommonMethods {

    loginIntoApplication(username: string, password: string): void {
        console.log("Enter the username: " + username)
        console.log("Enter the password: " + password)
        console.log("Click on the login button. ")
    }

    logoutFromApplication(): void {
        console.log("Click on the profile icon. ")
        console.log("Click on the logout button. ")
    }

}

// let obj = new CommonMethods(); // Cannot create an instance of an abstract class.