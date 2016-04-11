'use strict';

const Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers')

const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 3003,
  routes: {
    cors: true
  }
});

server.route({
  method:'GET',
  path:'/login',
  handler: function (request, reply) {
    reply(JSON.stringify({status:'success'}));
  }
});

server.route({
  method:'POST',
  path:'/register',
  handler: function (request, reply) {
    reply(JSON.stringify({status:'success'}));
  }
});

server.route({
	method:'POST',
	path:'/createEvent',
	handler: function(request, reply) {
		reply(JSON.stringify({status:'success'}));
	}
})

server.ext('onPreResponse', corsHeaders);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
