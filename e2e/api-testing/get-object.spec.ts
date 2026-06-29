import { test, expect } from '@playwright/test';

test('get method', async ({ request }) => {
  
const response = await request.get("https://api.restful-api.dev/objects");

expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

const body = await response.json();

console.log(body);

});

