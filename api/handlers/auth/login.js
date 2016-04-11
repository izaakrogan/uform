'use strict';

const Promise = require('bluebird');
const R = require('ramda');
const util = require('util');
const _ = require('lodash');
const utils = require('../../../shared/services/_utils.js');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../../../shared/services/jwt.js');

module.exports = (o) => (req,reply) => {

  o.Logger.info(`
    User login.
    Email: ${req.payload.email}
  `);

  const fsbPayload = Object.assign({
    remoteAddress:req.info.remoteAddress
  },_.cloneDeep(req.payload));

  /**
   * IMPORTANT: fsbUser will throw an error if the user is for
   * any reason excluded, timed out or doesn't exist. This will catched in the
   * error statement and reply with 'error - email or password incorrect'.
   * VICEVERSA if the user is not in our database but fsb doesn't throw an
   * error THAT MEANS our database doesn't have the user, we must create it.
   * ATTENTION: Since the user gets authenticated again the 'access_token'
   * will change. For this reason we need to update it on Postgres.
  **/
  Promise.props({
    fsb:o.Fsb.authenticate(fsbPayload),
    kenx:o.Knex.raw('user').select('*').where('email',req.payload.email)
  }).then(data => {

    const user = data.kenx;

    if (user.length === 0) {
      throw {createOldUser:true,oldUser:data.fsb.customer};
    }

    if (bcrypt.compareSync(req.payload.password,user[0].password) === false) {
      throw {valid:false};
    }

    o.Logger.info(`
      User login check user is not excluded.
      Email: ${req.payload.email}
      User: ${user[0].id}
    `);

    return Promise.props({
      updateUser:o.Knex.raw('user').update({
        access_token:data.fsb.customer.accessToken
      },'*').where('email',req.payload.email),
      fsbBalance:data.fsb.customer.balance
    });
  }).then(data => {

    const user = data.updateUser[0];

    const sessionData = {
      id:user.id,
      first_name:user.first_name,
      last_name:user.last_name,
      email:user.email,
      mobile_number:user.mobile_number,
      device_token:user.device_token,
      access_token:user.access_token,
      preferences:user.preferences
    };

    o.Logger.info(`
      User login save user session.
      Email: ${req.payload.email}
      Session: ${sessionData.id}
    `);

    return Promise.props({
      sessionId:o.Redis.session.create(sessionData),
      user:Object.assign(user,{balance:data.fsbBalance})
    });
  }).then(data => {
    o.Logger.info(`
      User login return token.
      Email: ${req.payload.email}
      Token: ${jwt.sign({sessionId:data.sessionId})}
    `);
    reply({
      status:'success',
      token:jwt.sign({sessionId:data.sessionId}),
      user:R.omit(['password'],data.user)
    });
  }).catch(error => {

    o.Logger.error(`
      Login catch one error.
      error: ${error}
      'error.toString':${error.toString()}
      'error.stringify':${JSON.stringify(error)}
    `);

    if ((error.valid === undefined) && !utils.isFsbError(error)) {
      o.ErrorService({
        name:'catch#api#handler#login',
        error:error,
        level:'critical'
      });
    }

    if (error.createOldUser === true && error.oldUser) {
      const newUser = error.oldUser;
      return o.Knex.raw('user').insert({
        fsb_id:newUser.id,
        access_token:newUser.accessToken,
        title:newUser.title,
        first_name:newUser.firstName,
        last_name:newUser.lastName,
        email:newUser.userName,
        mobile_number:'00000000000',
        password:bcrypt.hashSync(req.payload.password,bcrypt.genSaltSync(8)),
        date_of_birth:'1966-07-30',
        pin:'2222',
        preferences:JSON.stringify({
          "teamSelections": [],
          "stakeSelections": [],
          "personalSelections": [],
          "parsedTeamSelections": []
        })
      },'*');
    }

    reply({
      status:'error',
      message:'email or password incorrect'
    }).code(401);
  }).then(newUser => {
    const user = newUser[0];
    const sessionData = {
      id:user.id,
      first_name:user.first_name,
      last_name:user.last_name,
      email:user.email,
      mobile_number:user.mobile_number,
      device_token:user.device_token,
      access_token:user.access_token,
      preferences:user.preferences
    };

    o.Logger.info(`
      Old user created! Create and save user session.
      Email: ${req.payload.email}
      Session: ${sessionData.id}
    `);
    return Promise.props({
      sessionId:o.Redis.session.create(sessionData),
      user:user
    });
  }).then(data => {
    reply({
      status:'success',
      token:jwt.sign({sessionId:data.sessionId}),
      user:R.omit(['password'],data.user)
    });
  }).catch(error => {
    o.Logger.error(`
      Login catch two error.
      error: ${error}
      'error.toString':${error.toString()}
      'error.stringify':${JSON.stringify(error)}
    `);
    reply({
      status:'error',
      message:'email or password incorrect'
    }).code(401);
  });
};
