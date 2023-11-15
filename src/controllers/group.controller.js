'use strict';

const Group = require('../models/group.model');
const Manager = require('../models/manager.model');

exports.findAll = function(req, res) {
    Group.findAll(function(err, response) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', response);
    res.send(response);
  });
};


exports.create = function(req, res) {

    Group.create(req.body, function(err, response) {
        if (err)
        res.send(err);
        res.json({error:false,message:"Group added successfully!",data:response});
    });

    /*const new_response = new Group(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Group.create(new_response, function(err, response) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Group added successfully!",data:response});
        });
    }*/
};


exports.findById = function(req, res) {
    Group.findById(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};


exports.update = function(req, res) {
    //console.log(req.body);
    Group.update(req.body, function(err, response) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Updated successfully!",data:response});
    });
  
};


exports.delete = function(req, res) {
    Group.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Group deleted successfully!' });
  });
};

exports.findByGroupId = function(req, res) {
    
    Group.findByGroupId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};