//Interface is a special abstract class, and the speciality is it will accept 100% abstract methods only. 

interface CommonMethods1 {

    launchApplication(): void;

    loginIntoApplication(username: string, password: string): void;

    logoutFromApplication(): void;

}

interface CommonMethods2 {

    navigateToApplication(): void;

    closeTheApplication(): void;

}

class Google implements CommonMethods1, CommonMethods2 {

    launchApplication(): void {
        console.log("Launch the browser. ")
        console.log("Enter the URL: www.google.com ")
        console.log("Launch the application. ")
    }

    loginIntoApplication(username: string, password: string): void {
        console.log("Enter the username: " + username)
        console.log("Enter the password: " + password)
        console.log("Click on the login button. ")
    }

    logoutFromApplication(): void {
        console.log("Click on the profile icon. ")
        console.log("Click on the logout button. ")
    }

    navigateToApplication(): void {
        console.log("Navigate to the application. ")
    }

    closeTheApplication(): void {
        console.log("Close the application. ")
    }

}