let age: number = 17;

if (age < 18) {
    throw new Error("Not eligible to vote");
} else {
    console.log("Eligible to vote");
}
console.log("Execution Completed");