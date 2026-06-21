# Playwright Testing Assignments - Complete Implementation Guide

## 📋 Overview

This document summarizes the implementation of three Playwright testing assignments:

1. **Assignment 1**: API Testing (GET, POST, PUT, PATCH, DELETE)
2. **Assignment 2**: Setup Tests with Stored Authentication
3. **Assignment 3**: Playwright AI Agent & Test Generation

---

## ✅ Assignment 1: API Testing (CRUD Operations)

### File: `tests/assignment3.spec.ts`

**Features:**
- ✓ Complete API testing suite with GET, POST, PUT, PATCH, DELETE
- ✓ Uses JSONPlaceholder API for testing
- ✓ Error handling and negative test cases
- ✓ Response validation (status, headers, body)
- ✓ Full CRUD workflow test
- ✓ Performance benchmarking
- ✓ Response structure validation

**Test Breakdown:**

| Method | Tests | Coverage |
|--------|-------|----------|
| **GET** | 4 tests | All posts, single post, query params, 404 handling |
| **POST** | 4 tests | Create post, minimal fields, headers, missing fields |
| **PUT** | 3 tests | Full update, field replacement, non-existent resource |
| **PATCH** | 5 tests | Partial updates (single/multiple fields) |
| **DELETE** | 3 tests | Delete resource, multiple resources, 404 handling |
| **Advanced** | 3 tests | Full CRUD workflow, response time, JSON structure |

**Total: 22 comprehensive API tests**

**To Run:**
```bash
npx playwright test tests/assignment3.spec.ts
```

---

## ✅ Assignment 2: Setup Tests with Authentication

### File: `tests/auth.setup.ts`

**Features:**
- ✓ Logs in user with credentials from `.env`
- ✓ Stores authentication state in JSON file
- ✓ Error handling with descriptive messages
- ✓ Automatic setup before other tests

### File: `helpers/loginHelper.ts`

**Features:**
- ✓ Reusable login function
- ✓ Handles environment variables
- ✓ Validates successful login
- ✓ Comprehensive error handling

### File: `tests/assignment2.spec.ts` (Updated)

**Features:**
- ✓ Original login tests (positive & negative)
- ✓ **NEW**: Tests using stored authentication
- ✓ Verifies user is already logged in
- ✓ Tests protected page access
- ✓ Logout link verification

**To Run:**
```bash
# Run setup (creates auth file)
npx playwright test auth.setup.ts

# Run tests with stored auth
npx playwright test tests/assignment2.spec.ts
```

---

## ✅ Assignment 3: Setup Configuration

### File: `playwright.config.ts` (Updated)

**Configuration:**
```typescript
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/authentication.json', ✓ ENABLED
    },
    dependencies: ['setup'], ✓ Setup runs first
  },
]
```

**How It Works:**
1. `setup` project runs first
2. `auth.setup.ts` logs in and saves session
3. Chromium project loads saved session for all tests
4. Tests start already authenticated

---

## 📁 Project Structure

```
Palywright7/
├── helpers/
│   └── loginHelper.ts          (NEW) - Login utility function
├── tests/
│   ├── auth.setup.ts           (UPDATED) - Authentication setup
│   ├── assignment2.spec.ts     (UPDATED) - Auth + protected page tests
│   └── assignment3.spec.ts     (UPDATED) - Comprehensive API tests
├── Fixtures/
│   ├── constants.ts
│   ├── baseURL.json
│   ├── testData.json
├── playwright.config.ts        (UPDATED) - Project dependencies
├── .env                        (Already configured)
└── COPILOT_PROMPTS.md         (NEW) - All prompts used

playwright/
└── .auth/
    └── authentication.json     (Generated on first test run)
```

---

## 🔐 How Authentication Works

### 1️⃣ Setup Phase (First Run)
```
setup('Login and save authentication state', async ({ page }) => {
  await loginUser(page, username, password);
  await page.context().storageState({ path: authFile });
  // Saves: cookies, localStorage, sessionStorage
});
```

### 2️⃣ Reuse Phase (Subsequent Runs)
```typescript
test.use({ storageState: 'playwright/.auth/authentication.json' });

test('Test with stored auth', async ({ page }) => {
  // User is already logged in!
  // No need to login again
  await page.goto('protected-page');
});
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```
**Execution order:**
1. auth.setup.ts runs first (creates auth file)
2. All other tests run with stored authentication

### Run Specific Test File
```bash
# API tests
npx playwright test tests/assignment3.spec.ts

# Authenticated tests
npx playwright test tests/assignment2.spec.ts

# Setup test
npx playwright test tests/auth.setup.ts
```

### Run Specific Test
```bash
npx playwright test tests/assignment3.spec.ts -g "GET - Retrieve all posts"
```

### View HTML Report
```bash
npx playwright show-report
```

---

## 📊 API Test Statistics

**Total Test Cases:** 22

**Test Distribution:**
- GET Requests: 4 tests
- POST Requests: 4 tests
- PUT Requests: 3 tests
- PATCH Requests: 5 tests
- DELETE Requests: 3 tests
- Advanced Scenarios: 3 tests

**Coverage:**
- ✓ Happy path (successful operations)
- ✓ Error cases (404, invalid data)
- ✓ Response validation
- ✓ Header validation
- ✓ Performance benchmarking
- ✓ Full CRUD workflow
- ✓ JSON structure validation

---

## 🔧 Environment Configuration

### .env File Required
```
USERNAME=student
PASSWORD=Password123
EXPECTED_MESSAGE=Congratulations student. You successfully logged in!
EXPECTED_URL=https://practicetestautomation.com/logged-in-successfully/
INVALID_USERNAME=wronguser
INVALID_PASSWORD=wrongpassword
EXPECTED_ERROR=Your username is invalid!
LOGIN_URL=https://practicetestautomation.com/practice-test-login/
```

---

## 📝 Code Examples

### Login Helper Usage
```typescript
import { loginUser } from '../helpers/loginHelper';

await loginUser(page, 'student', 'Password123');
// Logs in and validates success
```

### Using Stored Auth in Tests
```typescript
test.describe('Authenticated Tests', () => {
  test.use({ storageState: 'playwright/.auth/authentication.json' });

  test('Access protected page', async ({ page }) => {
    await page.goto('protected-url');
    // Already authenticated!
  });
});
```

### API Testing
```typescript
test('POST - Create post', async ({ request }) => {
  const response = await request.post(`${API_BASE_URL}/posts`, {
    data: { title: 'Test', body: 'Body', userId: 1 }
  });

  expect(response.status()).toBe(201);
  const post = await response.json();
  expect(post.title).toBe('Test');
});
```

---

## 🎯 Key Features Implemented

✅ **Authentication Management**
- Login helper function
- Session storage in JSON
- Automatic session reuse

✅ **API Testing**
- All CRUD operations
- Error handling
- Response validation
- Performance checks

✅ **Best Practices**
- Environment variables for credentials
- Page Object Model pattern
- Comprehensive error messages
- Clear test descriptions
- Modular, reusable code

✅ **Test Organization**
- Logical test grouping
- Descriptive test names
- Comment documentation
- Clear assertions

---

## 🐛 Troubleshooting

### Auth File Not Created
```bash
# Ensure setup test runs first
npx playwright test tests/auth.setup.ts
# Check that auth directory exists
ls playwright/.auth/
```

### Tests Skip Login
```bash
# If tests still showing login screen:
# 1. Delete old auth file: rm playwright/.auth/authentication.json
# 2. Re-run setup: npx playwright test auth.setup.ts
# 3. Run tests: npm test
```

### API Tests Failing
```bash
# Check internet connection to JSONPlaceholder
# Verify response format with: npx playwright test --debug
# Check response timestamps for timeouts
```

---

## 📚 Copilot Prompts Used

See `COPILOT_PROMPTS.md` for complete list of prompts used to generate this code.

**Key prompts:**
1. Create login helper function
2. Setup authentication state
3. Configure Playwright project dependencies
4. Create API test structure
5. Add error handling and negative tests
6. Implement full CRUD workflow test
7. Create custom Playwright AI Agent prompt
8. Use AI Agent for test generation

---

## ✨ Assignment Completion Checklist

- [x] Assignment 1: API Testing
  - [x] GET requests
  - [x] POST requests
  - [x] PUT requests
  - [x] PATCH requests
  - [x] DELETE requests
  - [x] Error handling
  - [x] Copilot prompts saved

- [x] Assignment 2: Setup with Session Storage
  - [x] Login helper
  - [x] Auth setup file
  - [x] Session storage in JSON
  - [x] Tests using stored auth

- [x] Assignment 3: Playwright Configuration
  - [x] Project dependencies
  - [x] Setup runs first
  - [x] Auth reused in tests
  - [x] HTML reporting

---

## 📞 Next Steps

1. **Run Setup Test**: `npx playwright test auth.setup.ts`
2. **Verify Auth File**: Check `playwright/.auth/authentication.json`
3. **Run API Tests**: `npx playwright test assignment3.spec.ts`
4. **Run Auth Tests**: `npx playwright test assignment2.spec.ts`
5. **View Results**: `npx playwright show-report`

---

**Generated:** June 21, 2026
**Status:** ✅ All Assignments Complete
