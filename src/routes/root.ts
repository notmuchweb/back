import { FastifyPluginAsync } from "fastify";
import path from "path";
import servestatic from '@fastify/static'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.register(servestatic, {
        root: path.join(__dirname, '../../public'),
        // prefix: '/'
      })
    }

export default root;

