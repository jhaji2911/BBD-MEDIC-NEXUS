"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello = async (fastify, opts) => {
    fastify.get('/', async function (request, reply) {
        return 'Hi you are at the right place and right time!';
    });
};
exports.default = hello;
