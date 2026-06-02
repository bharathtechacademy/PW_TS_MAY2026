//1. Storing the data inside the object 
console.log("******Storing the data inside the Object*****");
interface personInfo {
    name: string,
    age: number,
    empId: number,
    visa?: boolean,
    salary?: number, //optional property
    currentAddress: {
        city: string,
        state: string,
        zip: number,
        country?: string //optional property
    },
    previousAddresses: {
        city: string,
        state: string,
        zip: number,
        country?: string //optional property
    }
}

let person: personInfo = {
    "name": "bahrath",
    "age": 35,
    "empId": 1234,
    "visa": true,
    "currentAddress": {
        "city": "hyderabad",
        "state": "telangana",
        "zip": 500032
    },
    "previousAddresses": {
        "city": "bangalore",
        "state": "karnataka",
        "zip": 560032
    }
}