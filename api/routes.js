'use strict';

const validateSchema = require('.validation.js');
const _ = require('lodash');

module.exports = o => {

  const getFiles = function (dir,files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name,files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  };

  const handlers = getFiles(__dirname+'/handlers')
  .filter(elm => !/.DS_Store/.test(elm))
  .map(elm => elm.split(__dirname)[1])
  .reduce(function (acc,elm) {
    const reqPath = `.${elm}`;
    const deep = elm.split('/').slice(1).map(elm => elm.split('.js')[0]).join('.');
    _.set(acc,deep,require(reqPath)(o));
    return acc;
  },{}).handlers;

  const failAction = (req,res,source,error) => {
    return res({status:'error',message:error.data.details}).code(400);
  };

  const routes = [
    {
      method:'GET',
      path:'/test',
      config:{
        auth:false,
      },
      handler: function (request, reply) {
        reply('success')
      }
    },
    {
      method:'POST',
      path:'/login',
      config:{
        auth:false,
        validate:{
          payload:validateSchema.login,
          failAction:failAction
        }
      },
      handler:handlers.auth.login
    }
  ];

  return routes;
};
