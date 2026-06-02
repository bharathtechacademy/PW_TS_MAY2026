//Object : an object is a non-primitive data type that can help us to store multiple properties in the form of key-value pairs. 


//1. Storing the data inside the object 
console.log("******Storing the data inside the Object*****");
interface personInfo {
    name: string,
    age: number,
    empId: number,
    visa?: boolean,
    salary?: number, //optional property
    address: {
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
    "address": {
        "city": "hyderabad",
        "state": "telangana",
        "zip": 500032
    }
}

//2. Accessing the data from the object
console.log("******Accessing the data from the Object*****");
console.log(person.name);
console.log(person["name"]);

console.log(person.address.zip); //When we are accessing the data from the object with static keys 
console.log(person["address"]["zip"]); //When we are accessing the data from the object with dynamic keys

// 3. Adding new properties to the existing object
//Add salary as 2 lakhs in the main object and country as India in the address object. 
console.log("******Adding new properties to the existing Object*****");
person.salary = 200000;
person.address.country = "India";
console.log(person);

//4. Update an existing property in the existing object. 
console.log("******Updating an existing property in the Object*****");
person.age = 36; //updating the age from 35 to 36
console.log(person);

//5. Deleting a property from the existing object.
console.log("******Deleting a property from the existing Object*****");
delete person.visa;
console.log(person);

//6. Checking if a property exists in the object
console.log("******Checking if a property exists in the Object*****");
console.log("visa" in person);
console.log("salary" in person);

// 7. Get all the keys from the object. 
console.log("******Getting all the keys from the Object*****");
console.log(Object.keys(person));

// 8. Get all the values from the object.
console.log("******Getting all the values from the Object*****");
console.log(Object.values(person));

// 9. Get all the entries from the object.
console.log("******Getting all the entries from the Object*****");
console.log(Object.entries(person));

// 10. Iterate all the keys from the object and get the value out of it. 
console.log("******Iterating all the keys from the Object*****");
for (let key in person) {
    console.log(`${key}: ${person[key as keyof personInfo]}`);
}

// 11. Verify the data type of the property within the object. 
console.log("******Verifying the data type of the property within the Object*****");
console.log(typeof person.name);
console.log(typeof person.age);
console.log(typeof person.address);

// 12. Merging two different objects together and making it as a single object. 
console.log("******Merging two different objects together*****");
interface companyInfo {
    companyName: string;
    location: string;
}

let company: companyInfo = {
    companyName: "Tech Company",
    location: "Hyderabad"
}
let mergedObject = { ...person, ...company };
console.log(mergedObject);