//String : string is a collection of characters in TypeScript. We can store string in single quotes, double quotes, or back ticks. 

//Text/String values ==> Sequence of chars ,we have to store inside double quotes or single quotes or back ticks
let firstName: string = "Bharath";
let lastName: string = 'Reddy';
console.log(`Name of the employee is ${firstName} ${lastName}`)

//1. Storing a string in a variable. 
console.log("******Storing a string in a variable*****");
let originalString: string = " Username : Admin | Password : admin123 ";
console.log(originalString);

//2. Method to calculate the total number of characters available in the string. => length()
console.log("******Method to calculate the total number of characters available in the string*****");
console.log(`Total number of characters in the string: ${originalString.length}`);

// 3. Method to get a specific character from a string by using an index. => charAt(Index)
console.log("******Method to get a specific character from a string by using an index*****");
console.log(`Character at index 0: ${originalString.charAt(0)}`);
console.log(`Character at index 1: ${originalString.charAt(1)}`);
console.log(`Character at index 2: ${originalString.charAt(2)}`);

//Reverse the string by using the above two methods. 
console.log("******Reverse the string by using the above two methods*****");
let reversedString: string = "";
for (let i = originalString.length - 1; i >= 0; i--) {
    reversedString += originalString.charAt(i);
}
console.log(`Reversed string: ${reversedString}`);

//4. Method to Remove the unwanted spaces from the string. 
console.log("******Method to Remove the unwanted spaces from the string*****");
let stringWithSpaces: string = "   Hello World!   ";
console.log(`Original string: "${stringWithSpaces}"`);
console.log(`Trimmed string: "${stringWithSpaces.trim()}"`);

//5. Method to remove all the spaces from the string. => replace(/old-char/g, "new-char")
console.log("******Method to remove all the spaces from the string*****");
console.log(`Original string: "${originalString}"`);
console.log(`String without spaces: "${originalString.replace(/ /g, "")}"`);

//6. Method to remove all the alphabets from the string. => replace(/old-char/g, "new-char")
console.log("******Method to remove all the alphabets from the string*****");
console.log(`Original string: "${originalString}"`);
console.log(`String without alphabets: "${originalString.replace(/[a-zA-Z]/g, "")}"`);

//7. Method to remove all the numbers from the string. => replace(/old-char/g, "new-char")
console.log("******Method to remove all the numbers from the string*****");
console.log(`Original string: "${originalString}"`);
console.log(`String without numbers: "${originalString.replace(/[0-9]/g, "")}"`);

//8. Method to remove all the special characters from the string => replace(/old-char/g, "new-char")
console.log("******Method to remove all the special characters from the string*****");
console.log(`Original string: "${originalString}"`);
console.log(`String without special characters: "${originalString.replace(/[^a-zA-Z0-9 ]/g, "")}"`);

//9. Method to convert the string into uppercase. => toUpperCase()
console.log("******Method to convert the string into uppercase*****");
console.log(`Original string: "${originalString}"`);
console.log(`String in uppercase: "${originalString.toUpperCase()}"`);

//10. Method to convert the string into lowercase. => toLowerCase()
console.log("******Method to convert the string into lowercase*****");
console.log(`Original string: "${originalString}"`);
console.log(`String in lowercase: "${originalString.toLowerCase()}"`);

//11. Method 2: Extract Specific Part of the String by Using Index => substring(startIndex, endIndex+1)
console.log("******Method 2: Extract Specific Part of the String by Using Index*****");
console.log(`Original string: "${originalString}"`);
console.log(`Username: "${originalString.substring(12, 17)}"`);
console.log(`Password: "${originalString.substring(31, 39)}"`);


//12. Method two: split the text into multiple parts and extract a particular part of the text. => split("separator")
console.log("******Method two: split the text into multiple parts and extract a particular part of the text*****");
console.log(`Original string: "${originalString}"`);
let stringParts: string[] = originalString.split(" ");
console.log(`Username: "${stringParts[3]!.trim()}"`);
console.log(`Password: "${stringParts[7]!.trim()}"`);

//13. Methods to Compare two different strings. 
console.log("******Methods to Compare two different strings*****");
//== (loose equality) (i.e. It checks only the value of the string.)
//=== (strict equality) (i.e. It checks both the value and the type of the string.)
//includes() (i.e. It checks whether a string contains a specific substring or not.)
//startsWith() (i.e. It checks whether a string starts with a specific substring or not.)
//endsWith() (i.e. It checks whether a string ends with a specific substring or not.)
let string1: string | number = "100";
let string2: string | number = 100;
console.log(`Using == operator: ${string1 == string2}`); // true
console.log(`Using === operator: ${string1 === string2}`);// false
console.log(`Using includes() method: ${originalString.includes("Admin")}`); // true
console.log(`Using startsWith() method: ${originalString.startsWith(" Username")}`); // true
console.log(`Using endsWith() method: ${originalString.endsWith("admin123 ")}`); // true

//14. Method to convert string to number/other types and vice versa. 
console.log("******Method to convert number/other types to String and vice versa*****");
let std: number = 144;
let number: number = 234567;
let stdCode: string = String(std);
console.log(stdCode + number);

//converting String to other data types 
let balance: string = "Account balance is $9,999.99."; //Verify whether my account has a minimum balance of $10,000. 
balance = balance.replace(/[^0-9.]/g, "");
let bal: number = parseFloat(balance);
console.log(bal >= 10000);