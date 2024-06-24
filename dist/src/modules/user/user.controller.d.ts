import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput, LoginUserInput } from "./user.schema";
export declare function createUser(req: FastifyRequest<{
    Body: CreateUserInput;
}>, reply: FastifyReply): Promise<never>;
export declare function login(req: FastifyRequest<{
    Body: LoginUserInput;
}>, reply: FastifyReply): Promise<never>;
export declare function getUsers(req: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function logout(req: FastifyRequest, reply: FastifyReply): Promise<never>;
