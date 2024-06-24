"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const user_schema_1 = require("./user.schema");
const user_controller_1 = require("./user.controller");
// import { ZodTypeProvider } from "fastify-type-provider-zod"
async function userRoutes(app) {
    // to get all users
    app.get("/all", {
        preHandler: [app.authenticate],
    }, user_controller_1.getUsers);
    app.post("/register", {
        schema: {
            body: (0, user_schema_1.$ref)("createUserSchema"),
            response: {
                201: (0, user_schema_1.$ref)("createUserResponseSchema"),
            },
        },
    }, user_controller_1.createUser);
    app.post("/login", {
        schema: {
            body: (0, user_schema_1.$ref)("loginSchema"),
            response: {
                200: (0, user_schema_1.$ref)("loginResponseSchema"),
            },
        },
    }, user_controller_1.login);
    app.delete("/logout", { preHandler: [app.authenticate] }, user_controller_1.logout);
    app.log.info("user routes registered");
}
