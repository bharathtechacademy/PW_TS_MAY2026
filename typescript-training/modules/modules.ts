//Modules in typescript : In TypeScript, each and every file will be treated as an independent component. 
//Whenever we want to share any data or common method from one file to the other Then we need to manually export from the source file and import into the target file.


//Update configuration within the package.json. ("type": "module")

// {"type": "module",
//   "devDependencies": {
//     "ts-node": "^10.9.2",
//     "typescript": "^6.0.3"
//   }
// }


//Update configurations within the tsconfig.json. 

    // "noEmit": true,
    // "allowImportingTsExtensions": true,



//   {
//   // Visit https://aka.ms/tsconfig to read more about this file
//   "compilerOptions": {
//     "noEmit": true,
//     "allowImportingTsExtensions": true,
//   }