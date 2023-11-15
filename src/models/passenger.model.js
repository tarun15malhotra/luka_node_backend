'user strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');

//Passenger object create
var Passenger = function(user){
    this.name     = user.name;
    this.email      = user.email;
    this.age          = user.age;
    this.phone          = user.phone;
    this.unique_identity          = user.unique_identity;
    this.boarding_point   = user.boarding_point;
    this.destination_point    = user.destination_point;
    /*this.total_distance         = user.total_distance;
    this.maximum_hour         = user.maximum_hour;
    this.minimum_hour         = user.minimum_hour;
    this.vehicle_type         = user.vehicle_type;
    this.status         = user.status ? user.status : 1;
    //this.created_at     = new Date();
    //this.updated_at     = new Date();*/
};

/*
Passenger.login = function (newEmp, result) {   

    let query =  "select id,name,email,phone,unique_identity,boarding_point,destination_point,minimum_hour,maximum_hour from users WHERE email = "+`'${newEmp.email}'`+"";
    console.log(query);
    dbMssql.query(query).then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });

};*/

Passenger.create = function (newEmp, result) {   

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

    /*
    dbMysql.query("INSERT INTO users set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });*/     
};
Passenger.findById = function (id, result) {

    dbMssql.query("select * from users WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0][0]);
    });
    
    /*
    dbMysql.query("Select * from users where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });*/
};
Passenger.findAll = function (result) {

    dbMssql.query("select users.id,users.group_id,users.name,users.email,users.phone,users.unique_identity,users.pickup,users.dropoff,users.minimum_time,users.maximum_time, groupings.name as group_name from users LEFT JOIN groupings ON groupings.id=users.group_id WHERE users.type = 4").then((res) =>{
     
    //dbMssql.query("select id,group_id as group_name,name,email,phone,unique_identity,boarding_point,destination_point,minimum_hour,maximum_hour from users WHERE type = 4").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });

    /*dbMysql.query("Select id,name,email,phone,unique_identity,boarding_point,destination_point,minimum_hour,maximum_hour from users", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('users : ', res);  
            result(null, res);
        }
    });*/
};
Passenger.update = function(newEmp, result){

    let query = "UPDATE users SET name = N"+`'${newEmp.name}'`+", email = N"+`'${newEmp.email}'`+", phone = N"+`'${newEmp.phone}'`+", unique_identity = N"+`'${newEmp.unique_identity}'`+", pickup = N"+`'${newEmp.pickup}'`+", dropoff = N"+`'${newEmp.dropoff}'`+", minimum_time = N"+`'${newEmp.minimum_time}'`+", maximum_time = N"+`'${newEmp.maximum_time}'`+" WHERE id = "+`'${newEmp.id}'`+""

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

  /*dbMysql.query("UPDATE users SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [user.first_name,user.last_name,user.email,user.phone,user.organization,user.designation,user.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); */
};
Passenger.delete = function(id, result){

    dbMssql.query("DELETE FROM users WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });

     /*dbMysql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });*/ 
};

module.exports= Passenger;