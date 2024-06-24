"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = void 0;
require("reflect-metadata");
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const static_1 = __importDefault(require("@fastify/static"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
// import { AsyncTask, CronJob, ToadScheduler } from "toad-scheduler";
const db_1 = __importDefault(require("./db"));
const user_schema_1 = require("./modules/user/user.schema");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const package_json_1 = require("../package.json");
const user_route_1 = require("./modules/user/user.route");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const options = {
    logger: true,
    // ...other options
};
exports.options = options;
const app = async (fastify, opts) => {
    fastify.register(multipart_1.default, { attachFieldsToBody: true });
    // Register CORS middleware to fix CORS error
    fastify.register(cors_1.default, {
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    });
    await (0, db_1.default)();
    for (let schema of [
        ...user_schema_1.userSchemas,
    ]) {
        fastify.addSchema(schema);
    }
    const swaggerOptions = {
        swagger: {
            info: {
                title: "BB AI talks",
                description: "Talk with our AI agents",
                version: package_json_1.version,
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
                version: package_json_1.version,
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
    await fastify.register(Promise.resolve().then(() => __importStar(require("@fastify/rate-limit"))), {
        max: 100,
        timeWindow: "1 minute",
    });
    // Register Swagger and Swagger UI
    fastify.register(swagger_1.default, swaggerOptions);
    fastify.register(swagger_ui_1.default, swaggerUiOptions);
    // Serve Swagger UI static files
    fastify.register(static_1.default, {
        root: (0, path_1.join)(__dirname, "public"),
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
    fastify.decorate("authenticate", async (req, reply) => {
        const token = req.cookies.access_token ?? req.headers.authorization;
        if (!token) {
            return reply.status(401).send({ message: "Authentication required" });
        }
        const decoded = req.jwt.verify(token);
        req.user = decoded;
    });
    fastify.register(user_route_1.userRoutes, { prefix: "api/users" });
    // Auto-load plugins and routes
    await fastify.register(jwt_1.default, {
        secret: "supersecretcode-CHANGE_THIS-USE_ENV_FILE",
    });
    fastify.addHook("preHandler", (req, res, next) => {
        req.jwt = fastify.jwt;
        return next();
    });
    await fastify.register(cookie_1.default, {
        secret: "some-secret-key",
        hook: "preHandler",
    });
    await fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    await fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "routes"),
        options: opts,
    });
};
exports.app = app;
exports.default = app;
