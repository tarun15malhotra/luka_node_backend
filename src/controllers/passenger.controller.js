'use strict';

const Passenger = require('../models/passenger.model');
const fs = require('fs');

exports.findAll = function(req, res) {
    Passenger.findAll(function(err, response) {
    //console.log('controller')
    if (err)
    res.send(err);
    //console.log('res', response);
    
    res.send(response);
  });
};


exports.create = function(req, res) {

    Passenger.create(req.body, function(err, response) {
        if (err)
        res.send(err);
        res.json({error:false,message:"Passenger added successfully!",data:response});
    });


    /*const new_response = new Passenger(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Passenger.create(new_response, function(err, response) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Passenger added successfully!",data:response});
        });
    }*/
};


exports.findById = function(req, res) {
    Passenger.findById(req.params.id, function(err, response) {
        if (err)
        res.send(err);
        res.json(response);
    });
};


exports.update = function(req, res) {

    Passenger.update(req.body, function(err, response) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Updated successfully!",data:response});
    });
  
};


exports.delete = function(req, res) {
    Passenger.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Passenger deleted successfully!' });
  });
};

exports.import = (req, res) => {
    //console.log(req.file);
    console.log(__dirname + '/uploads/' + req.file.filename);
    //res.send("NOT IMPLEMENTED: Author create GET");
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
  };
/*
exports.imports = function(req, res) {
      console.log('hhh');
    //console.log(__dirname + '/uploads/' + req.file.filename);
    /*Passenger.delete( req.params.id, function(err, response) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Passenger successfully deleted' });
  });
};
/*
// upload csv to database
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    //console.log('hhh');
    //console.log(__dirname + '/uploads/' + req.file.filename);
    //UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ');
});
 */
function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            //console.log(csvData);
            // Open the MySQL connection
           db.connect((error) => {
                if (error) {
                    //console.log('yyy');
                    console.error(error);
                } else {
                    console.log('kkk');
                    let query = 'INSERT INTO customer (address, name, age) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
  
    stream.pipe(csvStream);
}