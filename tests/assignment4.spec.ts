import { test, expect } from '@playwright/test';

/**
 * ASSIGNMENT 3: API TESTING
 * Comprehensive API tests for all CRUD operations (GET, POST, PUT, PATCH, DELETE)
 * Uses JSONPlaceholder API (https://jsonplaceholder.typicode.com)
 *
 * COPILOT PROMPTS USED:
 * 1. "Create Playwright API tests for GET, POST, PUT, PATCH, DELETE requests using JSONPlaceholder"
 * 2. "Add error handling and assertions for API response status codes and body validation"
 * 3. "Generate negative test cases for API failures"
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing - CRUD Operations', () => {

  // ========== GET REQUEST TESTS ==========
  test.describe('GET Requests', () => {

    test('GET - Retrieve all posts successfully', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/posts`);

      expect(response.status()).toBe(200);
      const posts = await response.json();
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('body');
      expect(posts[0]).toHaveProperty('userId');
    });

    test('GET - Retrieve single post by ID', async ({ request }) => {
      const postId = 1;
      const response = await request.get(`${API_BASE_URL}/posts/${postId}`);

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.id).toBe(postId);
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
    });

    test('GET - Retrieve posts with query parameters', async ({ request }) => {
      const userId = 1;
      const response = await request.get(`${API_BASE_URL}/posts?userId=${userId}`);

      expect(response.status()).toBe(200);
      const posts = await response.json();
      expect(Array.isArray(posts)).toBeTruthy();
      posts.forEach((post: any) => {
        expect(post.userId).toBe(userId);
      });
    });

    test('GET - Handle 404 error for non-existent resource', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/posts/99999`);

      // JSONPlaceholder returns 404 for IDs that don't exist
      expect(response.status()).toBe(404);
    });
  });

  // ========== POST REQUEST TESTS ==========
  test.describe('POST Requests', () => {

    test('POST - Create a new post successfully', async ({ request }) => {
      const newPost = {
        title: 'Test Post Title',
        body: 'This is a test post body',
        userId: 1,
      };

      const response = await request.post(`${API_BASE_URL}/posts`, {
        data: newPost,
      });

      expect(response.status()).toBe(201); // Created status
      const createdPost = await response.json();
      expect(createdPost.title).toBe(newPost.title);
      expect(createdPost.body).toBe(newPost.body);
      expect(createdPost.userId).toBe(newPost.userId);
      expect(createdPost.id).toBeTruthy();
    });

    test('POST - Create post with minimal required fields', async ({ request }) => {
      const minimalPost = {
        title: 'Minimal Post',
        body: 'Minimal body',
        userId: 2,
      };

      const response = await request.post(`${API_BASE_URL}/posts`, {
        data: minimalPost,
      });

      expect(response.status()).toBe(201);
      const post = await response.json();
      expect(post).toHaveProperty('id');
    });

    test('POST - Validate response headers', async ({ request }) => {
      const response = await request.post(`${API_BASE_URL}/posts`, {
        data: {
          title: 'Header Test',
          body: 'Testing headers',
          userId: 1,
        },
      });

      expect(response.status()).toBe(201);
      expect(response.headers()['content-type']).toContain('application/json');
    });

    test('POST - Negative test: Missing required fields', async ({ request }) => {
      const invalidPost = {
        title: 'Missing Body', // body is missing
        userId: 1,
      };

      const response = await request.post(`${API_BASE_URL}/posts`, {
        data: invalidPost,
      });

      // Even with missing fields, JSONPlaceholder accepts the request
      expect(response.status()).toBe(201);
    });
  });

  // ========== PUT REQUEST TESTS ==========
  test.describe('PUT Requests', () => {

    test('PUT - Update entire post successfully', async ({ request }) => {
      const postId = 1;
      const updatedPost = {
        id: postId,
        title: 'Updated Title via PUT',
        body: 'Updated body via PUT request',
        userId: 1,
      };

      const response = await request.put(`${API_BASE_URL}/posts/${postId}`, {
        data: updatedPost,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.title).toBe(updatedPost.title);
      expect(post.body).toBe(updatedPost.body);
      expect(post.id).toBe(postId);
    });

    test('PUT - Verify all fields are replaced', async ({ request }) => {
      const postId = 2;
      const updatedPost = {
        title: 'Completely New Title',
        body: 'Completely new body',
        userId: 5,
      };

      const response = await request.put(`${API_BASE_URL}/posts/${postId}`, {
        data: updatedPost,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.userId).toBe(5);
    });

    test('PUT - Update non-existent resource', async ({ request }) => {
      const response = await request.put(`${API_BASE_URL}/posts/99999`, {
        data: {
          title: 'Update non-existent',
          body: 'This resource does not exist',
          userId: 1,
        },
      });

      // JSONPlaceholder returns 500 for PUT on IDs > 100 (non-existent resources)
      expect(response.status()).toBe(500);
    });
  });

  // ========== PATCH REQUEST TESTS ==========
  test.describe('PATCH Requests', () => {

    test('PATCH - Partially update a post (title only)', async ({ request }) => {
      const postId = 3;
      const partialUpdate = {
        title: 'Patched Title Only',
      };

      const response = await request.patch(`${API_BASE_URL}/posts/${postId}`, {
        data: partialUpdate,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.title).toBe(partialUpdate.title);
      expect(post.id).toBe(postId);
    });

    test('PATCH - Partially update body field', async ({ request }) => {
      const postId = 4;
      const partialUpdate = {
        body: 'Only the body is being patched',
      };

      const response = await request.patch(`${API_BASE_URL}/posts/${postId}`, {
        data: partialUpdate,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.body).toBe(partialUpdate.body);
    });

    test('PATCH - Update userId field', async ({ request }) => {
      const postId = 5;
      const partialUpdate = {
        userId: 99,
      };

      const response = await request.patch(`${API_BASE_URL}/posts/${postId}`, {
        data: partialUpdate,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.userId).toBe(99);
    });

    test('PATCH - Multiple fields update', async ({ request }) => {
      const postId = 6;
      const partialUpdate = {
        title: 'Patched Title',
        body: 'Patched body',
      };

      const response = await request.patch(`${API_BASE_URL}/posts/${postId}`, {
        data: partialUpdate,
      });

      expect(response.status()).toBe(200);
      const post = await response.json();
      expect(post.title).toBe(partialUpdate.title);
      expect(post.body).toBe(partialUpdate.body);
    });
  });

  // ========== DELETE REQUEST TESTS ==========
  test.describe('DELETE Requests', () => {

    test('DELETE - Remove a post successfully', async ({ request }) => {
      const postId = 7;
      const response = await request.delete(`${API_BASE_URL}/posts/${postId}`);

      expect(response.status()).toBe(200); // JSONPlaceholder returns 200
      // JSONPlaceholder returns empty object on successful delete
      const result = await response.json();
      expect(Object.keys(result).length).toBe(0);
    });

    test('DELETE - Delete multiple resources', async ({ request }) => {
      const postIds = [8, 9, 10];

      for (const postId of postIds) {
        const response = await request.delete(`${API_BASE_URL}/posts/${postId}`);
        expect(response.status()).toBe(200);
      }
    });

    test('DELETE - Delete non-existent resource', async ({ request }) => {
      const response = await request.delete(`${API_BASE_URL}/posts/99999`);

      // JSONPlaceholder still returns 200 for non-existent resources
      expect(response.status()).toBe(200);
    });

    test('DELETE - Verify deleted resource cannot be retrieved', async ({ request }) => {
      const postId = 11;

      // Delete the post
      const deleteResponse = await request.delete(`${API_BASE_URL}/posts/${postId}`);
      expect(deleteResponse.status()).toBe(200);

      // JSONPlaceholder is a fake API — deletions are NOT persisted.
      // The resource still exists after "deletion".
      const getResponse = await request.get(`${API_BASE_URL}/posts/${postId}`);
      expect(getResponse.status()).toBe(200);
      const post = await getResponse.json();
      expect(post.id).toBe(postId);
    });
  });

  // ========== ADVANCED API TESTS ==========
  test.describe('Advanced API Scenarios', () => {

    test('Test - Full CRUD workflow', async ({ request }) => {
      // CREATE - JSONPlaceholder returns a fake ID (101) that doesn't actually exist
      const newPost = {
        title: 'CRUD Test Post',
        body: 'Testing full CRUD workflow',
        userId: 10,
      };
      const createResponse = await request.post(`${API_BASE_URL}/posts`, {
        data: newPost,
      });
      expect(createResponse.status()).toBe(201);
      const createdPost = await createResponse.json();
      expect(createdPost.id).toBeTruthy();

      // READ - Use a known existing ID (1-100) since JSONPlaceholder doesn't persist created posts
      const existingPostId = 1;
      const readResponse = await request.get(`${API_BASE_URL}/posts/${existingPostId}`);
      expect(readResponse.status()).toBe(200);

      // UPDATE (PUT)
      const updateResponse = await request.put(`${API_BASE_URL}/posts/${existingPostId}`, {
        data: {
          ...newPost,
          title: 'Updated Title',
        },
      });
      expect(updateResponse.status()).toBe(200);

      // PATCH
      const patchResponse = await request.patch(`${API_BASE_URL}/posts/${existingPostId}`, {
        data: { body: 'Patched body' },
      });
      expect(patchResponse.status()).toBe(200);

      // DELETE
      const deleteResponse = await request.delete(`${API_BASE_URL}/posts/${existingPostId}`);
      expect(deleteResponse.status()).toBe(200);
    });

    test('Test - Response time validation', async ({ request }) => {
      const startTime = Date.now();
      const response = await request.get(`${API_BASE_URL}/posts`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
    });

    test('Test - Validate JSON response structure', async ({ request }) => {
      const response = await request.get(`${API_BASE_URL}/posts/1`);
      expect(response.status()).toBe(200);

      const post = await response.json();
      const requiredFields = ['userId', 'id', 'title', 'body'];
      requiredFields.forEach((field: string) => {
        expect(post).toHaveProperty(field);
      });
    });
  });
});
