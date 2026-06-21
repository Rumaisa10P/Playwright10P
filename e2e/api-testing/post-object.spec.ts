import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

const macbookPayload = {
  name: 'Apple MacBook Pro 16',
  data: {
    year: 2019,
    price: 1849.99,
    'CPU model': 'Intel Core i9',
    'Hard disk size': '1 TB',
  },
};

test.describe('POST API Tests - /objects', () => {

  // ========== SUCCESS SCENARIOS ==========
  test.describe('Create Object - Success Scenarios', () => {

    test('POST - Create object and verify status 200', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      console.log('Status Code:', response.status());
      expect(response.status()).toBe(200);
    });

    test('POST - Verify response contains auto-generated ID', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      const body = await response.json();
      console.log('Response Body:', body);
      expect(body).toHaveProperty('id');
      expect(body.id).toBeTruthy();
    });

    test('POST - Verify response name matches request payload', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      const body = await response.json();
      expect(body.name).toBe(macbookPayload.name);
    });

    test('POST - Verify response data fields match request payload', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      const body = await response.json();
      expect(body.data.year).toBe(macbookPayload.data.year);
      expect(body.data.price).toBe(macbookPayload.data.price);
      expect(body.data['CPU model']).toBe(macbookPayload.data['CPU model']);
      expect(body.data['Hard disk size']).toBe(macbookPayload.data['Hard disk size']);
    });

    test('POST - Verify response contains createdAt timestamp', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      const body = await response.json();
      expect(body).toHaveProperty('createdAt');
      expect(body.createdAt).toBeTruthy();
    });

    test('POST - Validate Content-Type response header', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      expect(response.headers()['content-type']).toContain('application/json');
    });

  });

  // ========== DATA VALIDATION SCENARIOS ==========
  test.describe('Create Object - Data Validation', () => {

    test('POST - Verify full response structure has all required fields', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });

      const body = await response.json();
      const requiredFields = ['id', 'name', 'data', 'createdAt'];
      requiredFields.forEach(field => {
        expect(body).toHaveProperty(field);
      });
    });

    test('POST - Create object with minimal payload (name only)', async ({ request }) => {
      const minimalPayload = { name: 'Minimal Test Object' };

      const response = await request.post(`${BASE_URL}/objects`, {
        data: minimalPayload,
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.name).toBe(minimalPayload.name);
      expect(body).toHaveProperty('id');
    });

    test('POST - Response time is within acceptable limit (5s)', async ({ request }) => {
      const start = Date.now();
      const response = await request.post(`${BASE_URL}/objects`, {
        data: macbookPayload,
      });
      const duration = Date.now() - start;

      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(5000);
      console.log(`Response Time: ${duration}ms`);
    });

    test('POST - Verify created object ID is unique per request', async ({ request }) => {
      const response1 = await request.post(`${BASE_URL}/objects`, { data: macbookPayload });
      const response2 = await request.post(`${BASE_URL}/objects`, { data: macbookPayload });

      const body1 = await response1.json();
      const body2 = await response2.json();

      expect(body1.id).not.toBe(body2.id);
      console.log('ID 1:', body1.id, '| ID 2:', body2.id);
    });

  });

});
