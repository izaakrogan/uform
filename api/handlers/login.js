module.exports = (knex) => (request, reply) => {
  return knex('user').select('*').where('email',request.payload.email)
  .then(user => {
    if(user[0] && user[0].password === request.payload.password) {
      return reply(JSON.stringify({status:'success', user:user[0]}));
    } else {
      return reply(JSON.stringify({status:'error'}));
    }
  });
};
