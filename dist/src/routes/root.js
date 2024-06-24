"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root = async (fastify, opts) => {
    fastify.get('/', async function (request, reply) {
        return { BBD_MEDIC_NEXUS: {
                isRoot: true,
                version: '1.0.0',
                description: 'you are at the right place for details!, head onto /docs to explore more',
            } };
    });
};
exports.default = root;
