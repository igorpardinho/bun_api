import { t } from 'elysia';

export const createUserSchema = t.Object({
  name: t.String({
    minLength: 2,
    error: 'O nome deve ter pelo menos 3 caracters',
  }),
  email: t.String({ minLength: 10, error: 'Email deve ter no minimo 10 caracteres' }),
});
