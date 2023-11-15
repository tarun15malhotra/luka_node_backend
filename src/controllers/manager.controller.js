'use strict';

const Manager = require('../models/manager.model');

exports.findAll = function(req, res) {
    Manager.findAll(function(err, response) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', response);
    res.send(response);
  });
};


exports.create = function(req, res) {

    Manager.create(req.body, function(err, response) {
        if (err)
        res.send(err);
        res.json({error:false,message:"Manager added successfully!",data:response});
    });

    /*
    const new_response = new Manager(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Manager.create(new_response, function(err, response) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Manager added successfully!",data:response});
        });
    } */
};


exports.findById = function(req, res) {
    Manager.findById(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};


exports.update = function(req, res) {

    Manager.update(req.body, function(err, response) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Updated successfully!",data:response});
    });
  
};


exports.delete = function(req, res) {
    Manager.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Manager deleted successfully!' });
  });
};

exports.findByMgrId = function(req, res) {
    Manager.findByMgrId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};

exports.findByOrgMgrId = function(req, res) {
    Manager.findByOrgMgrId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};