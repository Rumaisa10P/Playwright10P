import { test, expect } from '@playwright/test';

test('DELETE - Delete object', async ({ request }) => {
  const postResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: 'Apple MacBook Pro 16',
      data: { year: 2019, price: 1849.99 },
    },
  });

  const created = await postResponse.json();
  const id = created.id;

  const deleteResponse = await request.delete(`https://api.restful-api.dev/objects/${id}`);

  expect(deleteResponse.status()).toBe(200);

  const body = await deleteResponse.json();
  console.log(body);

  expect(body.message).toContain(id);
});
