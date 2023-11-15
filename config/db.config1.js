'user strict';
/*
const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fortec@123#",
  database: "node"
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
*/

const sql = require('mssql');

// config for your database
var config = {
  user: 'sa',
  password: 'Fortec@123#',
  server: 'localhost', 
  database: 'node',
  synchronize: true,
  trustServerCertificate: true,
};


    // connect to your database
    sql.connect(config, function (err) {
      
      if (err) throw err;
      console.log("Database Connected!");
    
      if (err) console.log(err);

      // create Request object
      let request = new sql.Request();
      console.log('kkk');
      //console.log(request);
      // query to the database and get the records
     /* request.query('select * from users', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          console.log('kkk12');
          console.log(recordset);
          //res.send(recordset);
          
      });*/
    });
   // var request = new sql.Request();
//console.log(sql);
module.exports = sql;

/*

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Fortec@123#',
        server: 'localhost', 
        database: 'node',
        synchronize: true,
        trustServerCertificate: true,
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        console.log('kkk');
        // query to the database and get the records
        request.query('select * from users', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            console.log('kkk12');
            console.log(recordset);
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

*/