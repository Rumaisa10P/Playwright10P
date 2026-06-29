import { test, expect } from '@playwright/test';

test('POST - Create object', async ({ request }) => {
  const response = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body).toHaveProperty('id');
  expect(body.name).toBe('Apple MacBook Pro 16');
});
