"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.login = login;
exports.getUsers = getUsers;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../db"));
const entities_1 = require("../../entities");
const SALT_ROUNDS = 10;
async function createUser(req, reply) {
    const db = (await (0, db_1.default)()).em.fork();
    const { password, email, firstName, lastName } = req.body;
    const existingUser = await db.findOne(entities_1.Auth, {
        email: { $eq: email },
    });
    if (existingUser) {
        return reply.code(401).send({
            message: "User already exists with this email",
        });
    }
    try {
        const hash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = new entities_1.User({
            firstName,
            lastName,
            role: "HR",
        });
        await db.persistAndFlush(newUser);
        const newAuth = new entities_1.Auth({
            email,
            password: hash,
            user: newUser, // Assuming Auth has a relation to User
        });
        await db.persistAndFlush(newAuth);
        // Fetch the user with the related auth information
        const createdUser = await db.findOne(entities_1.Auth, {
            user: { $eq: newUser.id },
        });
        return reply.code(201).send(createdUser);
    }
    catch (e) {
        return reply.code(500).send(e);
    }
}
async function login(req, reply) {
    try {
        const db = (await (0, db_1.default)()).em.fork();
        const { email, password } = req.body;
        /*
         MAKE SURE TO VALIDATE  user data
         before performing the db query
        */
        //
        //using populate we perform access fk join to get the related data from Auth and User collections
        const userAuth = await db.findOne(entities_1.Auth, { email: { $eq: email } }, {
            populate: ["user"],
        });
        const isMatch = userAuth && (await bcrypt_1.default.compare(password, userAuth.password));
        if (!userAuth || !isMatch) {
            return reply.code(401).send({
                message: "Invalid email or password",
            });
        }
        const payload = {
            id: userAuth.user.id,
            email: userAuth.email,
            firstName: userAuth.user.firstName,
            lastName: userAuth.user.lastName,
            role: userAuth.user.role
        };
        const token = req.jwt.sign(payload);
        const newSession = new entities_1.Session({
            user: userAuth.user.id,
            token,
            status: "Active",
            expiryDate: new Date(Date.now() + 1000 * 60 * 60),
        });
        console.log('newSession=>', newSession);
        await db.persistAndFlush(newSession);
        reply.setCookie("access_token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
        });
        return reply.code(200).send({ accessToken: token });
    }
    catch (err) {
        console.log("Error in login", err);
        return reply.code(500).send({ message: "Internal Server Error" });
    }
}
async function getUsers(req, reply) {
    try {
        const db = (await (0, db_1.default)()).em.fork();
        const users = await db.find(entities_1.User, {});
        return reply.code(200).send(users);
    }
    catch (err) {
        console.log(err);
        return reply.code(500).send({ error: "Internal Server Error" });
    }
}
async function logout(req, reply) {
    reply.clearCookie("access_token");
    return reply.send({ message: "Logout successful" });
}
