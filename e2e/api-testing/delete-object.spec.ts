import { test, expect } from '@playwright/test';

// Run serially in one worker to conserve API rate limit (50 requests/24h free tier)
test.describe.configure({ mode: 'serial' });

const BASE_URL = 'https://api.restful-api.dev';

const objectPayload = {
  name: 'Apple MacBook Pro 16',
  data: {
    year: 2019,
    price: 1849.99,
    'CPU model': 'Intel Core i9',
    'Hard disk size': '1 TB',
  },
};

// Each delete test needs its own object — store multiple IDs upfront
const objectIds: string[] = [];

test.beforeAll(async ({ request }) => {
  // Create 6 objects — one per delete test
  for (let i = 0; i < 6; i++) {
    const response = await request.post(`${BASE_URL}/objects`, {
      data: { ...objectPayload, name: `${objectPayload.name} - Test ${i + 1}` },
    });

    const body = await response.json();

    if (!response.ok() || !body.id) {
      throw new Error(
        `Setup failed — POST /objects returned ${response.status()}.\n` +
        `Reason: ${body.error ?? 'Unknown error'}\n` +
        `Fix: The free API allows 50 requests/24h. Wait for reset or sign up at https://restful-api.dev/sign-in`
      );
    }

    objectIds.push(body.id);
  }

  console.log('Created object IDs for DELETE tests:', objectIds);
});

test.describe('DELETE API Tests - /objects/:id', () => {

  // ========== SUCCESS SCENARIOS ==========
  test.describe('Delete Object - Success Scenarios', () => {

    test('DELETE - Delete object and verify status 200', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${objectIds[0]}`);

      console.log('Status Code:', response.status());
      expect(response.status()).toBe(200);
    });

    test('DELETE - Verify response body is printed', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${objectIds[1]}`);

      const body = await response.json();
      console.log('Response Body:', body);
      expect(body).toBeTruthy();
    });

    test('DELETE - Verify response contains deletion confirmation message', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${objectIds[2]}`);

      const body = await response.json();
      expect(body).toHaveProperty('message');
      expect(body.message).toContain('has been deleted');
      console.log('Deletion Message:', body.message);
    });

    test('DELETE - Verify response message contains correct object ID', async ({ request }) => {
      const targetId = objectIds[3];
      const response = await request.delete(`${BASE_URL}/objects/${targetId}`);

      const body = await response.json();
      expect(body.message).toContain(targetId);
      console.log('Message:', body.message);
    });

    test('DELETE - Validate Content-Type response header', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${objectIds[4]}`);

      expect(response.headers()['content-type']).toContain('application/json');
    });

    test('DELETE - Verify deleted object cannot be retrieved (GET returns 404)', async ({ request }) => {
      const targetId = objectIds[5];

      // Delete the object
      const deleteResponse = await request.delete(`${BASE_URL}/objects/${targetId}`);
      expect(deleteResponse.status()).toBe(200);

      // Verify it no longer exists
      const getResponse = await request.get(`${BASE_URL}/objects/${targetId}`);
      console.log('GET status after DELETE:', getResponse.status());
      expect(getResponse.status()).toBe(404);
    });

  });

  // ========== DATA VALIDATION SCENARIOS ==========
  test.describe('Delete Object - Data Validation', () => {

    test('DELETE - Response time is within acceptable limit (5s)', async ({ request }) => {
      // Use a non-existent ID to avoid consuming a created object
      const start = Date.now();
      const response = await request.delete(`${BASE_URL}/objects/99999`);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(5000);
      console.log(`Response Time: ${duration}ms`);
    });

  });

  // ========== NEGATIVE SCENARIOS ==========
  test.describe('Delete Object - Negative Scenarios', () => {

    test('DELETE - Returns 404 for non-existent object ID', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/99999`);

      console.log('Status for non-existent ID:', response.status());
      expect(response.status()).toBe(404);
    });

  });

});
