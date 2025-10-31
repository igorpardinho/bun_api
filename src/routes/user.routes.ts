import Elysia from 'elysia';
import { userService } from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema';

export const userRoutes = new Elysia({ prefix: '/users' })

  .get('/', async () => userService.getAll)

  .post('/', async ({ body, set }) => {
    const newUser = await userService.create(body);

    set.status = 201;

    return newUser;
  }, { body: createUserSchema });
