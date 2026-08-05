/// <reference types="node" />

function sum(a: number, b: number): number {
    return a + b;
}

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

if (Number.isNaN(a) || Number.isNaN(b)) {
    console.log("Please provide two valid numbers.");
    process.exit(1);
}

console.log("Sum:", sum(a, b));

