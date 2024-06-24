import { FastifyPluginAsync } from "fastify"

const hello: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'Hi you are at the right place and right time!'
  })
}

export default hello;
