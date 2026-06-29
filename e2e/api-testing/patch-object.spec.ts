import { test, expect } from '@playwright/test';

test('PATCH - Partial update object', async ({ request }) => {
  const postResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 16',
      data: { year: 2019, price: 1849.99 },
    },
  });

  const created = await postResponse.json();
  const id = created.id;

  const patchResponse = await request.patch(`https://api.restful-api.dev/objects/${id}`, {
    data: { name: 'Apple MacBook Pro 16 (Updated)' },
  });

  expect(patchResponse.status()).toBe(200);

  const body = await patchResponse.json();
  console.log(body);

  expect(body.id).toBe(id);
  expect(body.name).toBe('Apple MacBook Pro 16 (Updated)');
  expect(body).toHaveProperty('updatedAt');
});
