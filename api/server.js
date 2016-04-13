'use strict';

const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost:5432/uform_test',
  searchPath: 'knex,public'
});

const registration = require('./handlers/registration.js')(knex);
const login = require('./handlers/login.js')(knex);
const create_event = require('./handlers/create_event.js')(knex);

const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 3003,
  routes: {
    cors: true
  }
});

server.route({
  method:'POST',
  path:'/login',
  handler:login
});

server.route({
  method:'POST',
  path:'/register',
  handler:registration
});

server.route({
	method:'POST',
	path:'/createEvent',
	handler:create_event
});

server.ext('onPreResponse', corsHeaders);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
