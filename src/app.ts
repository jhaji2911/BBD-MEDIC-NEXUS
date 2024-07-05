import "reflect-metadata";
import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyStatic from "@fastify/static";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import initORM from "./db";
import { userSchemas } from "./modules/user/user.schema";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { version } from "../package.json";
import { userRoutes } from "./modules/user/user.route";
import fastifyMultipart from "@fastify/multipart";




export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {
  // Add any additional options here
}

const options: AppOptions = {
  logger: true,
  // ...other options
};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {

  fastify.register(fastifyMultipart, { attachFieldsToBody: true });

  // Register CORS middleware to fix CORS error
  fastify.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  });

  await initORM();
  for (let schema of [
    ...userSchemas,
  ]) {
    fastify.addSchema(schema);
  }

  const swaggerOptions = {
    swagger: {
      info: {
        title: "BB AI talks",
        description: "Talk with our AI agents",
        version,
      },
      host: "localhost:3000",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Default", description: "Default" }],
    },
    openapi: {
      info: {
        title: "BBD-MEDIC-NEXUS ⋒",
        description: "this is at the intersection of your other APIs",
        version,
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  await fastify.register(import("@fastify/rate-limit"), {
    max: 1000,
    timeWindow: "10 minute",
  });
  // Register Swagger and Swagger UI
  fastify.register(fastifySwagger, swaggerOptions);
  fastify.register(fastifySwaggerUi, swaggerUiOptions);

  // Serve Swagger UI static files
  fastify.register(fastifyStatic, {
    root: join(__dirname, "../../public"),
    prefix: "/public/",
  });

  fastify.setErrorHandler(function (error, request, reply) {
    if (error.statusCode === 429) {
      reply.code(429);
      error.message =
        "maybe it is time to chill and relax, or you are making too many requests to our API";
      error.code = "TOO_MANY_REQUESTS";
    }
    reply.send(error);
  });

  // Graceful shutdown
  const listeners = ["SIGINT", "SIGTERM"];
  listeners.forEach((signal) => {
    process.on(signal, async () => {
      await fastify.close();
      process.exit(0);
    });
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.access_token ?? req.headers.authorization;
      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }
      const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
      req.user = decoded;
    }
  );

  fastify.register(userRoutes, { prefix: "api/users" });

  // Auto-load plugins and routes
  await fastify.register(fjwt, {
    secret: "supersecretcode-CHANGE_THIS-USE_ENV_FILE",
  });

  fastify.addHook("preHandler", (req, res, next) => {
    req.jwt = fastify.jwt;
    return next();
  });

  await fastify.register(fCookie, {
    secret: "some-secret-key",
    hook: "preHandler",
  });

  await fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  await fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });

};

export default app;
export { app, options };
