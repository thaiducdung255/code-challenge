import { z } from "zod";

export const listUserSchema = z.object({
	skip: z.coerce.number().int().min(0).default(0),
	limit: z.coerce.number().int().min(1).default(10),
	orderBy: z.enum(["id", "name", "email", "age", "phone"]).default("id"),
	orderDirection: z.enum(["asc", "desc"]).default("asc"),
	search: z.string().optional(),
	filterBy: z.enum(["name", "email", "age", "phone"]).optional(),
	filterValues: z
		.string()
		.transform((value) => value.split(","))
		.optional(),
});
