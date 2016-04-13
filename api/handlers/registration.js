module.exports = (knex) => (request, reply) => {
  return knex('user').insert(request.payload)
  .then(u => {
    reply(JSON.stringify({status:'success', user:u}));
  });
};
