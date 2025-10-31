import Elysia from 'elysia';

export const app = new Elysia()

  .get('/', () => 'API Bun + Elysia está online');
