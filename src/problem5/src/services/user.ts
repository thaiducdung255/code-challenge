import { listUserSchema } from "@validators/list-user-input";
import { db } from "@db/conn";
import { usersTable } from "@db/schema";
import { User } from "@interfaces/user";
import { z } from "zod";
import { SQL, asc, desc, or, ilike, inArray, eq } from "drizzle-orm";

export async function list(
	input: z.infer<typeof listUserSchema>,
): Promise<User[]> {
	const {
		skip,
		limit,
		orderBy,
		orderDirection,
		search,
		filterBy,
		filterValues,
	} = input;

	const orderFn = orderDirection === "asc" ? asc : desc;
	let filter: SQL<unknown> | undefined = undefined;

	if (search) {
		const pattern = `%${search}%`;
		filter = or(
			ilike(usersTable.name, pattern),
			ilike(usersTable.email, pattern),
			ilike(usersTable.phone, pattern),
		);
	}

	if (filterBy && filterValues) {
		filter = inArray(usersTable[filterBy], filterValues);
	}

	const users = await db
		.select()
		.from(usersTable)
		.limit(limit)
		.offset(skip)
		.where(filter)
		.orderBy(orderFn(usersTable[orderBy]));

	return users;
}

export async function deleteOne(id: number): Promise<User[]> {
	const deletedUsers = await db
		.delete(usersTable)
		.where(eq(usersTable.id, id))
		.returning();

	return deletedUsers;
}

export async function getOne(id: number): Promise<User[]> {
	const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
	return users;
}

export async function create(
	data: typeof usersTable.$inferInsert,
): Promise<User[]> {
	const users = await db.insert(usersTable).values(data).returning();
	return users;
}

export async function updateOne(
	id: number,
	data: Partial<typeof usersTable.$inferInsert>,
): Promise<User[]> {
	const users = await db
		.update(usersTable)
		.set(data)
		.where(eq(usersTable.id, id))
		.returning();

	return users;
}
