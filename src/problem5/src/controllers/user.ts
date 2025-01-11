import { StatusCode } from "@constants/http-status-code";
import { Controller } from "@interfaces/controller";
import { User } from "@interfaces/user";
import * as userService from "@services/user";
import { CreateUserSchema } from "@validators/create-user-input";
import { idSchema } from "@validators/id-input";
import { listUserSchema } from "@validators/list-user-input";

export const list: Controller<User[]> = async (req, res) => {
	const query = listUserSchema.safeParse(req.query);

	if (!query.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: query.error.message,
		});
	}

	const users = await userService.list(query.data);
	res.json({ code: StatusCode.SUCCESS, data: users });
};

export const deleteOne: Controller<User[]> = async (req, res) => {
	const params = idSchema.safeParse(req.params);

	if (!params.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: params.error.message,
		});
	}

	const deletedUsers = await userService.deleteOne(params.data.id);

	if (!deletedUsers.length) {
		return res.status(StatusCode.NOT_FOUND).json({
			code: StatusCode.NOT_FOUND,
			message: "User not found",
		});
	}

	res.json({ code: StatusCode.SUCCESS, data: deletedUsers });
};

export const getOne: Controller<User[]> = async (req, res) => {
	const params = idSchema.safeParse(req.params);

	if (!params.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: params.error.message,
		});
	}

	const users = await userService.getOne(params.data.id);

	if (!users.length) {
		return res.status(StatusCode.NOT_FOUND).json({
			code: StatusCode.NOT_FOUND,
			data: [],
			message: "User not found",
		});
	}

	return res.json({ code: StatusCode.SUCCESS, data: users });
};

export const createOne: Controller<User[]> = async (req, res) => {
	const body = CreateUserSchema.safeParse(req.body);

	if (!body.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: body.error.message,
		});
	}

	const users = await userService.create(body.data);
	return res.json({ code: StatusCode.SUCCESS, data: users });
};

export const updateOne: Controller<User[]> = async (req, res) => {
	const params = idSchema.safeParse(req.params);
	const body = CreateUserSchema.partial().safeParse(req.body);

	if (!params.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: params.error.message,
		});
	}

	if (!body.success) {
		return res.status(StatusCode.BAD_REQUEST).json({
			code: StatusCode.BAD_REQUEST,
			message: body.error.message,
		});
	}

	const users = await userService.updateOne(params.data.id, body.data);

	if (!users.length) {
		return res.status(StatusCode.NOT_FOUND).json({
			code: StatusCode.NOT_FOUND,
			data: [],
			message: "User not found",
		});
	}

	return res.json({ code: StatusCode.SUCCESS, data: users });
};
