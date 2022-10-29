import fastify from 'fastify';
import { REPL_MODE_SLOPPY } from 'repl';

interface IBody {
    seed?: string,
    length?: number,
    locale?: string,
};

interface IReply {
    word: string,
    seed: string,
};

const server = fastify();
server.get("/ping", async (_request, _reply) => {
    return "pong\n";
});

server.post<{ Body: IBody, Reply: IReply }>("/generate", async (request, reply) => {
    const { seed = NaN, length = NaN, locale = 'en' } = request.body;
    if (locale !== 'en') {
        reply.code(400).send({ 'msg': 'Local not supported' })
    }

});

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on: ${address}`);
});
