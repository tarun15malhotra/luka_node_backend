'user strict';

var mssql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Fortec@123#',
        server: 'localhost', 
        database: 'node',
        synchronize: true,
        trustServerCertificate: true,
    };

    async function query($query){

      try{

       let pool = await mssql.connect(config);
       console.log('MSSQL Database Connected!');

       let res = await pool.request().query($query);
       return res.recordsets;

      }catch(error){

        console.log("Connection Failed! "+error);
        //return error;

      }
    }

module.exports = {
  query:query,
};

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
  console.log("MYSQL Database Connected!");
});

module.exports = dbConn;
*/