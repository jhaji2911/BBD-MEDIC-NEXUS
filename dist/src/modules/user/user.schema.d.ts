import { z } from "zod";
declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}, {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type LoginUserInput = z.infer<typeof loginSchema>;
export declare const userSchemas: import("fastify-zod").JsonSchema[], $ref: import("fastify-zod/build/JsonSchema").$Ref<{
    createUserSchema: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
    }, {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
    }>;
    createUserResponseSchema: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        email?: string;
    }, {
        id?: string;
        email?: string;
    }>;
    loginSchema: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        password?: string;
    }, {
        email?: string;
        password?: string;
    }>;
    loginResponseSchema: z.ZodObject<{
        accessToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accessToken?: string;
    }, {
        accessToken?: string;
    }>;
}>;
export {};
