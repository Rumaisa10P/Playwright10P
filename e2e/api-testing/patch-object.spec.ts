// import { test, expect } from '@playwright/test';

// // Run all tests serially in one worker to conserve API rate limit (50 requests/24h free tier)
// test.describe.configure({ mode: 'serial' });

// const BASE_URL = 'https://api.restful-api.dev';

// const initialPayload = {
//   name: 'Apple MacBook Pro 16',
//   data: {
//     year: 2019,
//     price: 1849.99,
//     'CPU model': 'Intel Core i9',
//     'Hard disk size': '1 TB',
//   },
// };

// const patchPayload = {
//   name: 'Apple MacBook Pro 16 (Updated Name)',
// };

// let createdObjectId: string;

// test.beforeAll(async ({ request }) => {
//   // Create a fresh object via POST to get a valid ID for PATCH tests
//   const response = await request.post(`${BASE_URL}/objects`, {
//     data: initialPayload,
//   });

//   const body = await response.json();

//   if (!response.ok() || !body.id) {
//     throw new Error(
//       `Setup failed — POST /objects returned ${response.status()}.\n` +
//       `Reason: ${body.error ?? 'Unknown error'}\n` +
//       `Fix: The free API allows 50 requests/24h. Wait for reset or sign up at https://restful-api.dev/sign-in`
//     );
//   }

//   createdObjectId = body.id;
//   console.log('Created object ID for PATCH tests:', createdObjectId);
// });

// test.describe('PATCH API Tests - /objects/:id', () => {

//   // ========== SUCCESS SCENARIOS ==========
//   test.describe('Partial Update - Success Scenarios', () => {

//     test('PATCH - Partial update and verify status 200', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       console.log('Status Code:', response.status());
//       expect(response.status()).toBe(200);
//     });

//     test('PATCH - Verify response body is printed', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       console.log('Response Body:', body);
//       expect(body).toBeTruthy();
//     });

//     test('PATCH - Verify response ID matches requested object ID', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       expect(body.id).toBe(createdObjectId);
//     });

//     test('PATCH - Verify name is updated to new value', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       expect(body.name).toBe(patchPayload.name);
//       console.log('Updated Name:', body.name);
//     });

//     test('PATCH - Verify original data fields remain unchanged', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       // PATCH should only update name — data fields must stay intact
//       expect(body.data.year).toBe(initialPayload.data.year);
//       expect(body.data.price).toBe(initialPayload.data.price);
//       expect(body.data['CPU model']).toBe(initialPayload.data['CPU model']);
//       expect(body.data['Hard disk size']).toBe(initialPayload.data['Hard disk size']);
//     });

//     test('PATCH - Verify response contains updatedAt timestamp', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       expect(body).toHaveProperty('updatedAt');
//       expect(body.updatedAt).toBeTruthy();
//       console.log('Updated At:', body.updatedAt);
//     });

//     test('PATCH - Validate Content-Type response header', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       expect(response.headers()['content-type']).toContain('application/json');
//     });

//   });

//   // ========== DATA VALIDATION SCENARIOS ==========
//   test.describe('Partial Update - Data Validation', () => {

//     test('PATCH - Verify full response structure has all required fields', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       const requiredFields = ['id', 'name', 'data', 'updatedAt'];
//       requiredFields.forEach(field => {
//         expect(body).toHaveProperty(field);
//       });
//     });

//     test('PATCH - Verify only name changed (not entire object replaced)', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });

//       const body = await response.json();
//       // Name should be updated
//       expect(body.name).toBe(patchPayload.name);
//       // Data object should still exist (PATCH ≠ PUT full replace)
//       expect(body.data).toBeTruthy();
//       expect(Object.keys(body.data).length).toBeGreaterThan(0);
//     });

//     test('PATCH - Response time is within acceptable limit (5s)', async ({ request }) => {
//       const start = Date.now();
//       const response = await request.patch(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: patchPayload,
//       });
//       const duration = Date.now() - start;

//       expect(response.status()).toBe(200);
//       expect(duration).toBeLessThan(5000);
//       console.log(`Response Time: ${duration}ms`);
//     });

//   });

//   // ========== NEGATIVE SCENARIOS ==========
//   test.describe('Partial Update - Negative Scenarios', () => {

//     test('PATCH - Returns 404 for non-existent object ID', async ({ request }) => {
//       const response = await request.patch(`${BASE_URL}/objects/99999`, {
//         data: patchPayload,
//       });

//       console.log('Status for non-existent ID:', response.status());
//       expect(response.status()).toBe(404);
//     });

//   });

// });
