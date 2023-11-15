'use strict';

const Auth = require('../models/auth.model');
const fs = require('fs');
var dbMssql = require('./../../config/db.config');
const bcrypt = require("bcrypt")

exports.login = async function(req, res) {

      Auth.login(req.body, function(err, response) {
        if (err)
        res.send(err);

        res.send(response);
      });
}

exports.update = function(req, res) {
  
  Auth.update(req.body, function(err, response) {
    if (err)
    res.send(err);
    res.json({error:false,message:"Updated successfully!",data:response});
  });

};

exports.updateUserInGroup = function(req, res) {

  Auth.updateUserInGroup(req.body, function(err, response) {
    if (err)
    res.send(err);
    res.json({error:false,message:"Updated successfully!",data:response});
  });

};

