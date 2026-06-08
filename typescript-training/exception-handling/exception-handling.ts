//Exception Handling => Handle the exceptions. 

//try..catch..finally ==> When there is an exception and if you want to handle the exception and continue the execution process 
//throw => When there is no exception, but the user intentionally wants to fail the program by throwing an exception 


//try..catch..finally
try {
    //Code that may throw an exception
} catch (error) {
    //Code to handle the exception
} finally {
    //Code that will always execute, regardless of whether an exception was thrown or caught
}

//Example :

let input: any;
try {
    console.log(input.toLowerCase());
} catch (e) {
    console.log("An error occurred: " + e.message);
    console.log(input.toUpperCase());
} finally {
    console.log("Execution Completed");
}


//throw : 