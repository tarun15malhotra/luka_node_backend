'user strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');
const bcrypt = require("bcrypt")

//Driver object create
var Driver = function(user){
    this.name     = user.name;
    this.email      = user.email;
    this.phone          = user.phone;
    /*this.organization   = user.organization;
    this.designation    = user.designation;
    this.salary         = user.salary;
    this.status         = user.status ? user.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();*/
};
Driver.create = async function (newEmp, result) { 
     
   const hashPassword = await bcrypt.hash(newEmp.password, 10);
    newEmp.password = hashPassword;

    const propertyNames = Object.keys(newEmp);
    const propertyValues = Object.values(newEmp); 

    const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
    //const withCommasInBetween = valuesWrappedInQuotes.join(',')
    const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')
    console.log( withCommasInBetween );

    let query = `insert into users (`+propertyNames+`) values (`+withCommasInBetween+`)`;

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /* dbMysql.query("INSERT INTO users set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    }); */         
};
Driver.findById = function (id, result) {

    dbMssql.query("select id,name,email,phone from users WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0][0]);
    });

    /* dbMysql.query("Select * from users where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    }); */  
};
Driver.findAll = function (result) {

    dbMssql.query("select id,name,email,phone from users WHERE type = 3").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });

    /* dbMysql.query("Select * from users", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('users : ', res);  
            result(null, res);
        }
    }); */
};
Driver.update = async function(newEmp, result){


    let query ="";
    if (typeof newEmp.password == 'undefined' || newEmp.password == '') {
        
        query = "UPDATE users SET name = N"+`'${newEmp.name}'`+", email = N"+`'${newEmp.email}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+""

    } else {

        const hashPassword = await bcrypt.hash(newEmp.password, 10);
        query = "UPDATE users SET name = N"+`'${newEmp.name}'`+", email = N"+`'${newEmp.email}'`+", password = N"+`'${hashPassword}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+""

    }

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /* dbMysql.query("UPDATE users SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [user.first_name,user.last_name,user.email,user.phone,user.organization,user.designation,user.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); */
};
Driver.delete = function(id, result){

    dbMssql.query("DELETE FROM users WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });
    
     /* dbMysql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); */
};

Driver.findByDrId = function (id, result) {

    const query = "SELECT vehicles.vehicle_number, groupings.id as group_id, groupings.vehicle_id, users.id,users.name,users.email,users.phone,users.unique_identity,users.pickup,users.dropoff,users.minimum_time,users.maximum_time, groupings.name as group_name FROM vehicles INNER JOIN groupings ON groupings.vehicle_id = vehicles.id INNER JOIN users ON users.group_id = groupings.id WHERE vehicles.driver_id="+id+"";
    // LEFT JOIN users ON users.group_id = groupings.id WHERE vehicles.driver_id="+id+"
   // dbMssql.query("select * from vehicles WHERE driver_id="+id+"").then((res) =>{
    dbMssql.query(query).then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });
    
    /* dbMysql.query("Select * from users where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    }); */ 
};

Driver.findByOrgDrId = function (id, result) {

    dbMssql.query("select id,org_id,name,email,phone from users WHERE type = 3 AND org_id="+id+"").then((res) =>{

        result(null, res[0]);
    });
    
};

module.exports= Driver;