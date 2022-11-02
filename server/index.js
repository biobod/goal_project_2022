/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const {PORT, ORIGIN} = require('../common/serverConstants')
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

const { json } = require('body-parser')
const http = require('http');
const {typeDefs} = require('./typeDefs');
const {resolvers} = require('./resolvers');



async function startApolloServer() {
    // Required logic for integrating with Express
    const app = express();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    // Ensure we wait for our server to start
    await server.start();
    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use(
        '/',
        cors({
            credentials: true,
            origin: ORIGIN
        }),
        json(),
        cookieParser(),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res })
        }),
    );
    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

}

startApolloServer()
