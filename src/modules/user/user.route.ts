import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import {
  addUserAddress,
  createUser,
  getUserAddress,
  getUsers,
  login,
  logout,
} from "./user.controller";
// import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function userRoutes(app: FastifyInstance) {
  // to get all users
  app.get(
    "/all",
    // {
    //   preHandler: [app.authenticate],
    // },
    getUsers
  );

  app.get("/get-address/:id", getUserAddress);

  app.post(
    "/add-address/:id",
    {
      schema: {
        body: $ref("userAddressSchema"),
      },
    },
    addUserAddress
  );
  app.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUser
  );
  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    login
  );
  app.delete("/logout", { preHandler: [app.authenticate] }, logout);
  app.log.info("user routes registered");
}
