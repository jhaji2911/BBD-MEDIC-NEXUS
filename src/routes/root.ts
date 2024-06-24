import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {

  
    return { BBD_MEDIC_NEXUS: {
      isRoot: true,
      version: '1.0.0',
      description: 'you are at the right place for details!, head onto /docs to explore more',
      
    } }
  })
}

export default root;
