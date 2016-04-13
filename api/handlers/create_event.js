module.exports = (knex) => (request, reply) => {
  return knex('event').insert(request.payload)
  .then(() => {
    return knex('event').select('*')
    .then(all => {
      reply(JSON.stringify({status:'success', events:all}));
    });
  });
};
