1️⃣ Project Folder Naming (Root Level)

Convention:
➡️ kebab-case (lowercase + hyphen)
playwright-automation
node-api-testing
user-management-service

2️⃣ Folder & Subfolder Naming
🔹 General Rule : ➡️ kebab-case OR camelCase (be consistent)

🔹 Recommended (Most Popular) : ➡️ kebab-case
src/
tests/
page-objects/
utils/
test-data/
api-clients/
config/

🔹 Alternative (Less Common) : ➡️ camelCase
src/
testCases/
pageObjects/

3️⃣ File Naming (.js / .ts)
🔹 Rule : ➡️ kebab-case for file names

✅ Good
login-page.ts
home-page.ts
user-service.ts
auth-utils.ts
❌ Bad
LoginPage.ts
login_page.ts
loginPage.ts

4️⃣ Variable Naming
🔹 Rule : ➡️ camelCase

✅ Good 
let userName = "Admin";
let isLoggedIn = true;
let totalPrice = 100;

5️⃣ Constant Naming
🔹 Rule :➡️ UPPER_SNAKE_CASE

✅ Good
const BASE_URL = "https://example.com";
const TIMEOUT_MS = 30000;

6️⃣ Function Naming
🔹 Rule : ➡️ camelCase + verb

✅ Good
function loginUser() {}
function getUserDetails() {}
function validateLogin() {}

7️⃣ Class Naming
🔹 Rule : ➡️ PascalCase

✅ Good
class LoginPage {}
class UserService {}
class AuthHelper {}

1️⃣1️⃣ Environment & Config Files

➡️ lowercase
.env
.env.local
playwright.config.ts
tsconfig.json
package.json