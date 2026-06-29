import { test, expect } from '@playwright/test';

test('PUT - Full update object', async ({ request }) => {
  const postResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 16',
      data: { year: 2019, price: 1849.99 },
    },
  });

  const created = await postResponse.json();
  const id = created.id;

  const putResponse = await request.put(`https://api.restful-api.dev/objects/${id}`, {
    data: {
      name: 'Apple MacBook Pro 16 (Full Update)',
      data: { year: 2023, price: 2049.99, 'CPU model': 'Apple M3 Pro' },
    },
  });

  expect(putResponse.status()).toBe(200);

  const body = await putResponse.json();
  console.log(body);

  expect(body.id).toBe(id);
  expect(body.name).toBe('Apple MacBook Pro 16 (Full Update)');
  expect(body).toHaveProperty('updatedAt');
});
