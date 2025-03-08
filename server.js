import {fastify} from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

//Rotas usando fastify

//Request body
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send(); //Envio de resposta com o código 201 - "Created"
});

server.get('/videos', async (request) => {
    const search = request.query.search; //Query string

    const videos = await database.list(search);

    return videos;
});

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    await database.uptade(videoId, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: 8080,
});