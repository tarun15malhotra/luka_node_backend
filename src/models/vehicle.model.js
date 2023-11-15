'vehicle strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');

//Vehicle object create
var Vehicle = function(vehicle){
    this.first_name     = vehicle.first_name;
    this.last_name      = vehicle.last_name;
    this.email          = vehicle.email;
    this.phone          = vehicle.phone;
    this.organization   = vehicle.organization;
    this.designation    = vehicle.designation;
    this.salary         = vehicle.salary;
    this.status         = vehicle.status ? vehicle.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};
Vehicle.create = function (newEmp, result) {    

    const propertyNames = Object.keys(newEmp);
    const propertyValues = Object.values(newEmp); 

    const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
    //const withCommasInBetween = valuesWrappedInQuotes.join(',')
    const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')
    console.log( withCommasInBetween );

    let query = `insert into vehicles (`+propertyNames+`) values (`+withCommasInBetween+`)`;

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /* dbMysql.query("INSERT INTO vehicles set ?", newEmp, function (err, res) {
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
Vehicle.findById = function (id, result) {

    dbMssql.query("select * from vehicles WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0][0]);
    });

    /* dbMysql.query("Select * from vehicles where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    }); */   
};
Vehicle.findAll = function (result) {

    //dbMssql.query("select id,vehicle_number,boarding_point,destination_point,vehicle_route,driver_id from vehicles").then((res) =>{

    dbMssql.query("select vehicles.id,vehicles.vehicle_number,vehicles.boarding_point,vehicles.destination_point,vehicles.vehicle_route,vehicles.driver_id, users.name as driver_name from vehicles LEFT JOIN users ON vehicles.driver_id=users.id").then((res) =>{
     
        //console.log(res[0]);
        result(null, res[0]);
    });

    /* dbMysql.query("Select id,vehicle_number,boarding_point,destination_point,vehicle_route,driver_id from vehicles", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('vehicles : ', res);  
            result(null, res);
        }
    }); */   
};
Vehicle.update = function(newEmp, result){

    let query = "UPDATE vehicles SET vehicle_number = N"+`'${newEmp.vehicle_number}'`+", boarding_point = N"+`'${newEmp.boarding_point}'`+", destination_point = N"+`'${newEmp.destination_point}'`+", vehicle_route = N"+`'${newEmp.vehicle_route}'`+", driver_id = N"+`'${newEmp.driver_id}'`+" WHERE id = "+`'${newEmp.id}'`+""

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });
    /* dbMysql.query("UPDATE vehicles SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [vehicle.first_name,vehicle.last_name,vehicle.email,vehicle.phone,vehicle.organization,vehicle.designation,vehicle.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); */
};
Vehicle.delete = function(id, result){

    dbMssql.query("DELETE FROM vehicles WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });

    /* dbMysql.query("DELETE FROM vehicles WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); */
};


Vehicle.findByOrgVehId = function (id, result) {

    dbMssql.query("select vehicles.id,vehicles.org_id,vehicles.vehicle_number,vehicles.boarding_point,vehicles.destination_point,vehicles.vehicle_route,vehicles.driver_id, users.name as driver_name from vehicles LEFT JOIN users ON vehicles.driver_id=users.id WHERE vehicles.org_id="+id+"").then((res) =>{

        result(null, res[0]);
    });
    
};

module.exports= Vehicle;