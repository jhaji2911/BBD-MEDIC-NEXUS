"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
// data that we need from user to register
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
// response schema for registering user
const createUserResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
// same for login route
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    password: zod_1.z.string().min(6),
});
const loginResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
// to build our JSON schema, we use buildJsonSchemas from fastify-zod
// it returns all the schemas to register and a ref to refer these schemas
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
}), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
