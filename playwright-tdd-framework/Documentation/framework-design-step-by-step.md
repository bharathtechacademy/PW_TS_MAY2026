# Playwright TDD Framework Design Step-by-Step 

## 1. Creating a new local working directory within the workspace. 
* Example : playwright-tdd-framework
* teminal-command : cd C:\Training\PlaywrightTrainings\May_2026\playwright-tdd-framework

## 2. Install necessary dependencies based on the project requirements. 
1. **TypeScript** — `npm install typescript ts-node @types/node` and `npx tsc --init` for programming language support.
2. **Playwright** — `npm init playwright@latest` (or add `@playwright/test`) for web / API automation with the Playwright.
3. **PostgreSQL** — `npm install pg @types/pg` to connect to a database and perform db validations
4. **Excel** — `npm install excel xlsx` to read or work with spreadsheet data.
5. **PDF** — `npm install pdf-parse` and (in this project) `pdf-parse-new` for PDF utilities.

## 3. Update the global configurations at the project level within the package.json and typescript configuration.json files. 
 
 * package.json  => "type": "module"   //to import data from other files
 * tsconfig.json =>  "verbatimModuleSyntax": false
 * tsconfig.json =>  "types": ["node"]

 ## 4. Create the folder structure to maintain different components of the framework. 
 1. commons => To maintain all the common methods related to UI (commons\ui\web-commons.ts), API(commons\api\api-commons.ts), database (commons\db\db-commons.ts), performance testing(commons\jmeter\jmeter-commons.ts), and AI-related (commons\ai\ai-commons.ts) common methods at one place 

 2. config => config.json file to maintain the configuration data or common data for all the components like URLs, Credentials, Database Connection Information, AI-related tokens, etc.

 3. testdata => To maintain the test data related to each and every component like UI (testdata\ui\data.json), API (testdata\api\data.json), Database,AI and Performance Testing 

 4. utilities => To maintain common methods related to all the utilities we are going to use in our framework based on our application needs, like:
- Excel utility
- database utility
- PDF utility
- image utility
- QR code utility
etc.

5. page-objects => To maintain page-wise locators (page-elements) and page-wise common methods (page-steps) separately to implement the page object model design pattern in our framework 

6. tests => To maintain all the test cases related to each and every component (- UI,
- API,- Database,- AI,- Load Testing) of your project 

7. test-results => To maintain all the test results, reports,videos, traces, etc. related to our test execution results 

8. test-results/screenshots => To maintain specific screenshot related to your application, also can be maintained under the test results screenshots folder. 

9. files => To maintain flat files like Excel, PDF, CSV, images, etc 

10. .env =>  Environment-specific credentials to be maintained within the local system to run the code locally 