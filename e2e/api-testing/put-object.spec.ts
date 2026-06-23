// import { test, expect } from '@playwright/test';

// // Run all tests serially in one worker — prevents beforeAll from firing per worker
// // and conserves API rate limit (50 requests/24h on free tier)
// test.describe.configure({ mode: 'serial' });

// const BASE_URL = 'https://api.restful-api.dev';

// const putPayload = {
//   name: 'Apple MacBook Pro 16',
//   data: {
//     year: 2019,
//     price: 2049.99,
//     'CPU model': 'Intel Core i9',
//     'Hard disk size': '1 TB',
//     color: 'silver',
//   },
// };

// // Dynamically created object ID shared across all PUT tests
// let createdObjectId: string;

// test.beforeAll(async ({ request }) => {
//   // Create a new object via POST to get a valid ID for PUT tests
//   const response = await request.post(`${BASE_URL}/objects`, {
//     data: { name: 'Temp Object for PUT tests', data: { note: 'setup' } },
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
//   console.log('Created object ID for PUT tests:', createdObjectId);
// });

// test.describe('PUT API Tests - /objects/:id', () => {

//   // ========== SUCCESS SCENARIOS ==========
//   test.describe('Update Object - Success Scenarios', () => {

//     test('PUT - Update object and verify status 200', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       console.log('Status Code:', response.status());
//       expect(response.status()).toBe(200);
//     });

//     test('PUT - Verify response body is printed', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       console.log('Response Body:', body);
//       expect(body).toBeTruthy();
//     });

//     test('PUT - Verify response ID matches requested object ID', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body.id).toBe(createdObjectId);
//     });

//     test('PUT - Verify response name matches updated payload', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body.name).toBe(putPayload.name);
//     });

//     test('PUT - Verify all data fields are updated correctly', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body.data.year).toBe(putPayload.data.year);
//       expect(body.data.price).toBe(putPayload.data.price);
//       expect(body.data['CPU model']).toBe(putPayload.data['CPU model']);
//       expect(body.data['Hard disk size']).toBe(putPayload.data['Hard disk size']);
//       expect(body.data.color).toBe(putPayload.data.color);
//     });

//     test('PUT - Verify response contains updatedAt timestamp', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body).toHaveProperty('updatedAt');
//       expect(body.updatedAt).toBeTruthy();
//       console.log('Updated At:', body.updatedAt);
//     });

//     test('PUT - Validate Content-Type response header', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       expect(response.headers()['content-type']).toContain('application/json');
//     });

//   });

//   // ========== DATA VALIDATION SCENARIOS ==========
//   test.describe('Update Object - Data Validation', () => {

//     test('PUT - Verify full response structure has all required fields', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       const requiredFields = ['id', 'name', 'data', 'updatedAt'];
//       requiredFields.forEach(field => {
//         expect(body).toHaveProperty(field);
//       });
//     });

//     test('PUT - Verify price is updated to new value', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body.data.price).toBe(2049.99);
//       console.log('Updated Price:', body.data.price);
//     });

//     test('PUT - Verify new color field is added after update', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });

//       const body = await response.json();
//       expect(body.data).toHaveProperty('color');
//       expect(body.data.color).toBe('silver');
//     });

//     test('PUT - Response time is within acceptable limit (5s)', async ({ request }) => {
//       const start = Date.now();
//       const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
//         data: putPayload,
//       });
//       const duration = Date.now() - start;

//       expect(response.status()).toBe(200);
//       expect(duration).toBeLessThan(5000);
//       console.log(`Response Time: ${duration}ms`);
//     });

//   });

//   // ========== NEGATIVE SCENARIOS ==========
//   test.describe('Update Object - Negative Scenarios', () => {

//     test('PUT - Returns 404 for non-existent object ID', async ({ request }) => {
//       const response = await request.put(`${BASE_URL}/objects/99999`, {
//         data: putPayload,
//       });

//       console.log('Status for non-existent ID:', response.status());
//       expect(response.status()).toBe(404);
//     });

//   });

// });
