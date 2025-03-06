import {fastify} from "fastify";
import {DatabaseMemory} from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

//Rotas usando fastify

//Request body
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body;

    database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send(); //Envio de resposta com o código 201 - "Created"
});

server.get('/videos', (request) => {
    const search = request.query.search; //Query string

    const videos = database.list(search);

    return videos;
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    const video = database.uptade(videoId, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: 8080,
});