import express from "express";
import * as userController from "@controllers/user";

export const userRouter = express.Router();
/**
 * User
 * @typedef {object} User
 * @property {number} id.required - min: 1
 * @property {string} name.required - minLength: 2, maxLength: 100
 * @property {string} email.required - minLength: 5, maxLength: 100
 * @property {string} phone - minLength: 8, maxLength: 15
 * @property {number} age - min: 0, max: 200
 */

/**
 * Create User
 * @typedef {object} CreateUser
 * @property {string} name.required - minLength: 2, maxLength: 100
 * @property {string} email.required - minLength: 5, maxLength: 100
 * @property {string} phone - minLength: 8, maxLength: 15
 * @property {number} age - min: 0, max: 200
 */

/**
 * Update User
 * @typedef {object} UpdateUser
 * @property {string} name - minLength: 2, maxLength: 100
 * @property {string} email - minLength: 5, maxLength: 100
 * @property {string} phone - minLength: 8, maxLength: 15
 * @property {number} age - min: 0, max: 200
 */

/**
 * Api respsone
 * @typedef {object} ApiResponse
 * @property {number} code.required - HTTP status code. min: 200, max: 599
 * @property {string} message - HTTP respsone information
 * @property {array<User>} data - response data
 */

/**
 * GET /api/v1/users
 * @tags User
 * @summary List users
 * @param {number} skip.query - number of records will be skiped. Default: 0
 * @param {number} limit.query - maximum records can be returned. Default: 10
 * @param {string} orderBy.query - order by field - enum: id, name, email, age, phone
 * @param {string} orderDirection.query - order direction - enum: asc, desc
 * @param {string} search.query - filter record that contain given value. Work on fields: [name, email, phone]
 * @param {string} filterBy.query - field name for perform exact match - enum: name, email, age, phone
 * @param {string} filterValues.query - field values for perform exact match. Format: <value1>,<value2>
 * @returns {ApiResponse} 200 - success - application/json
 * @example response - 200 - success
 * {
 *   "skip": 0,
 *   "limit": 10
 * }
 * @returns {number} 400 - bad request - application/json
 */
userRouter.get("/", userController.list);

/**
 * GET /api/v1/users/{id}
 * @tags User
 * @summary Get a user by id
 * @param {number} id.path.required - user's id
 * @returns {ApiResponse} 200 - success - application/json
 * @returns {number} 404 - user not found - application/json
 */
userRouter.get("/:id", userController.getOne);

/**
 * DELETE /api/v1/users/{id}
 * @tags User
 * @summary Delete a user by id
 * @param {number} id.path.required - user's id
 * @returns {ApiResponse} 200 - success - application/json
 * @returns {ApiResponse} 404 - user not found - application/json
 */
userRouter.delete("/:id", userController.deleteOne);

/**
 * POST /api/v1/users
 * @tags User
 * @summary Create a user
 * @param {CreateUser} request.body - create user payload
 * @returns {ApiResponse} 200 - success - application/json
 * @returns {ApiResponse} 400 - bad request - application/json
 * @returns {ApiResponse} 404 - not found - application/json
 */
userRouter.post("/", userController.createOne);

/**
 * PATCH /api/v1/users/{id}
 * @tags User
 * @summary Update a user by id
 * @param {number} id.path.required - user's id
 * @param {UpdateUser} request.body - update user payload
 * @returns {ApiResponse} 200 - success - application/json
 * @returns {ApiResponse} 404 - not found - application/json
 * @returns {ApiResponse} 400 - bad request - application/json
 */
userRouter.patch("/:id", userController.updateOne);
