# COPILOT PROMPTS USED FOR PLAYWRIGHT TESTING ASSIGNMENTS

## Assignment 1: Authentication Setup

### Prompt 1: Create Login Helper Function
```
Create a Playwright helper function called 'loginUser' that:
- Takes page, username, and password as parameters
- Navigates to login URL from environment variable
- Fills username and password fields using role locators
- Clicks submit button
- Waits for successful login (checks for logged-in URL)
- Includes error handling with descriptive messages
- Uses expect for assertions
```

### Prompt 2: Setup Authentication State
```
Create a Playwright setup file (auth.setup.ts) that:
- Uses test.setup() function
- Calls the loginUser helper with credentials from environment variables
- Saves authentication state to 'playwright/.auth/authentication.json'
- Can be reused in other tests via storageState property
- Includes error handling and logging
```

### Prompt 3: Configure Playwright Project Dependencies
```
Update playwright.config.ts to:
- Define 'setup' project that matches *.setup.ts files
- Create 'chromium' project with storageState pointing to auth file
- Set setup as dependency for chromium project
- This ensures setup runs before tests and auth is reused
```

---

## Assignment 2: Playwright Setup Test with Session Storage

### Prompt 4: Implement Session Management
```
Modify auth.setup.ts to:
- Store user session in JSON file using page.context().storageState()
- Include cookies, localStorage, and sessionStorage
- Make the auth file available at 'playwright/.auth/authentication.json'
- Include try-catch error handling
- Add console logging for successful authentication
```

### Prompt 5: Use StorageState in Tests
```
Create test files that:
- Use test.use({ storageState: 'playwright/.auth/authentication.json' })
- Skip login step since session is already stored
- Tests should start from authenticated state
- Verify user is already logged in before proceeding with test logic
```

---

## Assignment 3: API Testing (GET, POST, PUT, PATCH, DELETE)

### Prompt 6: Create API Test Structure
```
Create comprehensive Playwright API tests in assignment3.spec.ts that:
- Use request fixture for API calls
- Create test.describe blocks for each HTTP method
- Test GET requests (all items, single item, with query params)
- Test POST requests (create resource, validate response)
- Test PUT requests (full update of resource)
- Test PATCH requests (partial update)
- Test DELETE requests (remove resource)
- Use JSONPlaceholder API (https://jsonplaceholder.typicode.com)
```

### Prompt 7: Add Error Handling and Negative Tests
```
Add negative test cases for API tests:
- Test 404 responses for non-existent resources
- Test missing required fields in POST/PUT requests
- Test invalid data types
- Validate error messages in response body
- Test response header validation
- Verify response time is within acceptable limits
```

### Prompt 8: Implement Full CRUD Workflow Test
```
Create a comprehensive test that:
- Creates a new resource via POST
- Reads the resource via GET
- Updates it via PUT
- Patches it via PATCH
- Deletes it via DELETE
- Validates each operation's response
- Verifies the resource state after each operation
```

---

## Assignment 3b: Create Playwright AI Agent (Custom Agent)

### Prompt 9: Generate AI Agent Prompt
```
I need to create a custom Playwright AI Agent that can:
1. Generate test cases based on requirements
2. Analyze test failures and suggest fixes
3. Refactor test code for better readability
4. Validate test coverage
5. Generate performance benchmarks

Create a system prompt for this agent that:
- Understands Playwright best practices
- Recognizes Page Object Model patterns
- Can parse test scenarios and convert to code
- Validates accessibility and performance metrics
- Suggests test optimizations
```

### Prompt 10: Use AI Agent for Test Generation
```
Using the Playwright AI Agent:
1. Generate test cases for login page functionality
2. Create API integration tests
3. Generate end-to-end tests for complete user workflows
4. Validate all tests follow Page Object Model
5. Ensure tests are maintainable and scalable
6. Generate HTML reports for test results
```

---

## Key Copilot Features Used:

1. **Code Generation**: Created complete test files and helpers
2. **Error Handling**: Added try-catch blocks and meaningful error messages
3. **Best Practices**: Used Page Object Model pattern
4. **Assertions**: Comprehensive expect statements for validation
5. **Test Organization**: Logical grouping with test.describe blocks
6. **Documentation**: Comments explaining test purposes
7. **Reusability**: Helper functions for common operations
8. **Performance**: Response time validation
9. **Security**: Environment variable usage for credentials

---

## Testing Workflow:

1. Run setup tests first: `npx playwright test auth.setup.ts`
2. Run API tests: `npx playwright test assignment3.spec.ts`
3. Run all tests with auth: `npx playwright test`
4. View HTML report: `npx playwright show-report`

---

## Generated Code Files:

- `helpers/loginHelper.ts` - Reusable login function
- `tests/auth.setup.ts` - Setup file for authentication
- `tests/assignment3.spec.ts` - Comprehensive API tests
- `playwright.config.ts` - Updated configuration with setup dependency

---
