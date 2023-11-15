'use strict';

const Driver = require('../models/driver.model');

exports.findAll = function(req, res) {
    Driver.findAll(function(err, response) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', response);
    res.send(response);
  });
};


exports.create = function(req, res) {

    Driver.create(req.body, function(err, response) {
        if (err)
        res.send(err);
        res.json({error:false,message:"Driver added successfully!",data:response});
    });

    /*const new_response = new Driver(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Driver.create(new_response, function(err, response) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Driver added successfully!",data:response});
        });
    } */
};


exports.findById = function(req, res) {
    Driver.findById(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};


exports.update = function(req, res) {

    Driver.update(req.body, function(err, response) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Updated successfully!",data:response});
    });
  
};


exports.delete = function(req, res) {
    Driver.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Driver deleted successfully!' });
  });
};

exports.findByDrId = function(req, res) {
    Driver.findByDrId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};

exports.findByOrgDrId = function(req, res) {
    Driver.findByOrgDrId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};