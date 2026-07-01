//Array : Array is a collection of multiple values. 

//1. Storing the values within the array. 
console.log("******Storing the values within the array******");
let fruits: string[] = ["apple", "mango", "grapes"];
let prices: number[] = [100, 200, 300];
let fruitsAndPrices: (string | number)[] = ["apple", 100, "mango", 80, "grapes", 160];


//2. Accessing the values from the array.
console.log("******Accessing the values from the array******");
console.log(fruits);
console.log(prices);
console.log(fruitsAndPrices);
console.log(fruits[1]);
console.log(fruitsAndPrices[3]);


//3.Add additional value to the existing array at the end. 
console.log("******Add additional value to the existing array at the end******");
fruits.push("banana");
console.log(fruits);

//4. Remove the last value from the array.
console.log("******Remove the last value from the array******");
fruits.pop();
console.log(fruits);

//5.Add additional value to the existing array at the begining. 
console.log("******Add additional value to the existing array at the begining******");
fruits.unshift("banana");
console.log(fruits);

//6. Remove the begining value from the array.
console.log("******Remove the begining value from the array******");
fruits.shift();
console.log(fruits);

//7. Adding additional value to the existing array at a specific index by deleting existing values 
console.log("******Adding additional value to the existing array at a specific index by deleting existing values ******");
//splice(index, number-of-values-to-be-deleted, values-to-be-added)
// fruits.splice(2,0,"banana");
fruits.splice(1,1,"banana","pappaya");
console.log(fruits);

//8. Create a new array by extracting the values from the existing array. 
console.log("******Create a new array by extracting the values from the existing array******");
let veggies :  string [] = ["carrot", "onion", "brinjal", "potato", "chilli"]
let availableVeggies :string[]= veggies.slice(1,4) // slice(startInde, endIndex+1)
console.log(availableVeggies);

//9. Create a new array by concatenating two or more arrays together. 
console.log("******Create a new array by concatenating two or more arrays together******");
let fruitsAndVeggies : string [] = fruits.concat(veggies);
console.log(fruitsAndVeggies);

//10. Find the index of a specific value within the array. 
console.log("******Find the index of a specific value within the array******");
console.log(fruits.indexOf("mango"));//if the value is not present in the array it will return -1
console.log(fruits.indexOf("banana"));

//11. Iterate all the values from the array. 
console.log("******Iterate all the values from the array******");
for(let fruit of fruits){
    console.log(fruit);
}

//12. Reverse the values within the array. 
console.log("******Reverse the values within the array******");
fruits.reverse();
console.log(fruits);

//13. Sort the values within the array.
console.log("******Sort the values within the array******");
fruits.sort();
console.log(fruits);
descending order
fruits.sort((a,b)=>b-a);
console.log(fruits);
