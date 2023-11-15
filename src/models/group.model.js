'group strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');

//Group object create
var Group = function(group){
    this.name     = group.name;
   /* this.number_of_seats = group.number_of_seats;
    this.maximum_minutes = group.maximum_minutes;
    this.logical_number = group.logical_number;
    this.route = group.route;
    this.vehicle_id = group.vehicle_id;
    this.status = group.status ? group.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();*/

};
Group.create = function (newEmp, result) {    


    const propertyNames = Object.keys(newEmp);
    const propertyValues = Object.values(newEmp); 

    const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
    //const withCommasInBetween = valuesWrappedInQuotes.join(',')
    const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')
    console.log( withCommasInBetween );

    let query = `insert into groupings (`+propertyNames+`) values (`+withCommasInBetween+`)`;

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /* dbMysql.query("INSERT INTO groupings set ?", newEmp, function (err, res) {
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
Group.findById = function (id, result) {

    dbMssql.query("select * from groupings WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0][0]);
    });

    /* dbMysql.query("Select * from groupings where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    }); */
};
Group.findAll = async function (result) {

    //dbMssql.query("select id,name,number_of_seats,maximum_minutes,logical_number from groupings").then((res) =>{
     //   dbMssql.query("select COUNT(*) from groupings").then((res) =>{
     // dbMssql.query("select groupings.id,groupings.name,groupings.number_of_seats,groupings.maximum_minutes,groupings.logical_number, vehicles.vehicle_number as vehicle_number from groupings LEFT JOIN vehicles ON groupings.vehicle_id=vehicles.id").then((res) =>{
        //dbMssql.query("select  SUM(groupings.id),groupings.id,groupings.name,groupings.number_of_seats,groupings.maximum_minutes,groupings.logical_number, vehicles.vehicle_number as vehicle_number,users.group_id from groupings LEFT JOIN vehicles ON groupings.vehicle_id=vehicles.id INNER JOIN users ON groupings.id=users.group_id").then((res) =>{
           // select count(*) from users where group_id = 1 
        let query1 = "select groupings.id,groupings.name,groupings.number_of_seats,groupings.maximum_minutes,groupings.logical_number, vehicles.vehicle_number as vehicle_number from groupings LEFT JOIN vehicles ON groupings.vehicle_id=vehicles.id";
        const res1 = await dbMssql.query(query1);

        var i;
        for (i = 0; i < res1[0].length; ++i) {

            var item = res1[0][i];
            let query2 = 'select count(*) as no_of_passengers from users where group_id = '+item.id+'';
            const res = await dbMssql.query(query2);
            res1[0][i].no_of_passengers = res[0][0].no_of_passengers;
           
        }
        console.log(res1[0]);
    
        result(null, res1[0]);
        
   // });

};
Group.update = function(newEmp, result){

    console.log(newEmp);

    let query = "UPDATE groupings SET name = N"+`'${newEmp.name}'`+", number_of_seats = N"+`'${newEmp.number_of_seats}'`+", maximum_minutes = N"+`'${newEmp.maximum_minutes}'`+", logical_number = N"+`'${newEmp.logical_number}'`+", vehicle_id = "+`'${newEmp.vehicle_id}'`+" WHERE id = "+`'${newEmp.id}'`+""

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /* dbMysql.query("UPDATE groupings SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [group.first_name,group.last_name,group.email,group.phone,group.organization,group.designation,group.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); */
};
Group.delete = async function(id, result){

    /*dbMssql.query("DELETE FROM groupings WHERE id="+id+"").then((res) =>{
        //console.log(res[0]);
        result(null, res[0]);
    });*/
    
    let query1 = "DELETE FROM groupings WHERE id="+id+""
    const res1 = await dbMssql.query(query1);

    let query2 = "UPDATE users SET group_id = '' WHERE group_id = "+id+""
    const res2 = await dbMssql.query(query2);

    result(null, res1[0]);


    /* dbMysql.query("DELETE FROM groupings WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); */
};

Group.findByGroupId = function (id, result) {

    //console.log(id);

    //dbMssql.query("select * from users WHERE user_id="+id+"").then((res) =>{
    dbMssql.query("select groupings.id,groupings.org_id,groupings.user_id,groupings.name,groupings.number_of_seats,groupings.maximum_minutes,groupings.logical_number, vehicles.vehicle_number as vehicle_number from groupings LEFT JOIN vehicles ON groupings.vehicle_id=vehicles.id WHERE groupings.org_id="+id+"").then((res) =>{
    
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

module.exports= Group;