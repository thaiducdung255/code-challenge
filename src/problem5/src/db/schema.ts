import { pgTable, unique, integer, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
	"users",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		name: varchar({ length: 100 }).notNull(),
		age: integer(),
		phone: varchar({ length: 15 }),
		email: varchar({ length: 100 }).notNull(),
	},
	(table) => {
		return {
			usersEmailUnique: unique("users_email_unique").on(table.email),
		};
	},
);
