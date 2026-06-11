//Asynchronous function with promise :

//normal function to generate random number
function normalFunction(): number {
    return Math.random();
}

//call the normal function
console.log(normalFunction());


//Asynchronous function to generate a random number with a promise 
// (Promise is always I want the number greater than 0.5 , Otherwise, fail/reject the program.  )
async function getRandomNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        console.log("Using asynchronous functions ");
        console.log(random);
        if (random > 0.5) {
            resolve(random);
        } else {
            reject(new Error(`Random number ${random} is less than 0.5`));
        }
    });
}

//Asynchronous function to generate a random number with a promise and a timeout of 10 seconds 
async function getRandomNumberWithTimeout(): Promise<number> {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const random = Math.random();
            console.log("Using asynchronous functions with ");
            console.log(random);
            if (random > 0.5) {
                resolve(random);
            } else {
                reject(new Error(`Random number ${random} is less than 0.5`));
            }
        }, 10000)

    });
}


//Calling the asynchronous function. 
let value = await getRandomNumberWithTimeout();
console.log(value);
