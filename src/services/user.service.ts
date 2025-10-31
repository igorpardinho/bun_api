import { desc } from 'drizzle-orm';
import { db } from '../db/db';
import { usersTable, type InsertUser } from '../db/schema';

export const userService = {

  getAll: async () => db.select().from(usersTable).orderBy(desc(usersTable.createdAt)),

  create: async (userData:InsertUser) => {
    const newUser = await db.insert(usersTable).values(userData).returning();
    return newUser[0];
  },
};
