import {PI, add } from './1-named-exports.ts';
import {PI as pi, add as sum, substract as sub} from './2-export-all.ts';

console.log("Value of PI :"+ pi);
console.log("Sum of Numbers 2,3 is "+ sum(2,3));
console.log("Difference of Numbers 5,2 is "+ sub(5,2));

console.log("Value of PI :"+ PI);
console.log("Sum of Numbers 2,3 is "+ add(2,3));
