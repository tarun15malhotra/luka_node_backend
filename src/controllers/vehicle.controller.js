'use strict';

const Vehicle = require('../models/vehicle.model');

exports.findAll = function(req, res) {
    Vehicle.findAll(function(err, response) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', response);
    res.send(response);
  });
};


exports.create = function(req, res) {

    Vehicle.create(req.body, function(err, response) {
        if (err)
        res.send(err);
        res.json({error:false,message:"Vehicle added successfully!",data:response});
    });

    
    /*const new_response = new Vehicle(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Vehicle.create(new_response, function(err, response) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Vehicle added successfully!",data:response});
        });
    }*/
};


exports.findById = function(req, res) {
    Vehicle.findById(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};


exports.update = function(req, res) {

    Vehicle.update(req.body, function(err, response) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Updated successfully!",data:response});
    });
  
};


exports.delete = function(req, res) {
    Vehicle.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Vehicle deleted successfully!' });
  });
};

exports.findByOrgVehId = function(req, res) {
    Vehicle.findByOrgVehId(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};