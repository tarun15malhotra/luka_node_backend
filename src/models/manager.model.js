'user strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');
const bcrypt = require("bcrypt")

//Manager object create
var Manager = function(user){
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
Manager.create = async function (newEmp, result) { 

    var name = `'${newEmp.name}'`;
    let org_id = '';

    await dbMssql.query("select * from organizations WHERE name="+name+"").then(async function(res) {

            if(!res[0] || res[0].length < 1 || !res[0][0].id){

                let query1 = 'insert into organizations (name) values (N'+name+'); SELECT SCOPE_IDENTITY() as id';
                const res = await dbMssql.query(query1);
                org_id = res[0][0].id;

            }else{

                org_id = res[0][0].id;
                
            }
    });

    newEmp.org_id = org_id;
    //newEmp.name = '';

    const hashPassword = await bcrypt.hash(newEmp.password, 10);
    newEmp.password = hashPassword;
    
    const propertyNames = Object.keys(newEmp);
    const propertyValues = Object.values(newEmp); 

    const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
    //const withCommasInBetween = valuesWrappedInQuotes.join(',')
    const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')
    //console.log( withCommasInBetween );

    let query = `insert into users (`+propertyNames+`) values (`+withCommasInBetween+`)`;

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

    /*dbMysql.query("INSERT INTO users set ?", newEmp, function (err, res) {
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
Manager.findById = function (id, result) {

    dbMssql.query("select users.id,users.org_id,users.name,users.email,users.phone,organizations.name as org_name from users LEFT JOIN organizations ON organizations.id=users.org_id WHERE users.id="+id+"").then((res) =>{
    //dbMssql.query("select id,name,email,phone from users WHERE id="+id+"").then((res) =>{
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
Manager.findAll = function (result) {

    dbMssql.query("select users.id,users.org_id,users.name,users.email,users.phone,organizations.name as org_name from users LEFT JOIN organizations ON organizations.id=users.org_id WHERE users.type = 2").then((res) =>{
    //dbMssql.query("select id,org_id,name,email,phone from users WHERE type = 2").then((res) =>{
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
Manager.update = async function(newEmp, result){

    var name = `'${newEmp.org_name}'`;
    let org_id = '';

    await dbMssql.query("select * from organizations WHERE name="+name+"").then(async function(res) {

            if(!res[0] || res[0].length < 1 || !res[0][0].id){

                let query1 = 'insert into organizations (name) values (N'+name+'); SELECT SCOPE_IDENTITY() as id';
                const res = await dbMssql.query(query1);
                org_id = res[0][0].id;

            }else{

                org_id = res[0][0].id;
                
            }
    });

    newEmp.org_id = org_id;

    let query ="";
    if (typeof newEmp.password == 'undefined' || newEmp.password == '') {
        
        query = "UPDATE users SET org_id = N"+`'${newEmp.org_id}'`+", email = N"+`'${newEmp.email}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+""

    } else {

        const hashPassword = await bcrypt.hash(newEmp.password, 10);
        query = "UPDATE users SET org_id = N"+`'${newEmp.org_id}'`+", email = N"+`'${newEmp.email}'`+", password = N"+`'${hashPassword}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+""

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
Manager.delete = function(id, result){

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

Manager.findByMgrId = function (id, result) {

    //dbMssql.query("select * from users WHERE user_id="+id+"").then((res) =>{
    dbMssql.query("select users.id,users.org_id,users.name,users.email,users.phone,users.unique_identity,users.pickup,users.dropoff,users.minimum_time,users.maximum_time, groupings.name as group_name from users LEFT JOIN groupings ON groupings.id=users.group_id WHERE users.type = 4 AND users.org_id="+id+"").then((res) =>{
    
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


Manager.findByOrgMgrId = function (id, result) {

    dbMssql.query("select users.id,users.org_id,users.name,users.email,users.phone,users.unique_identity,users.pickup,users.dropoff,users.minimum_time,users.maximum_time, groupings.name as group_name from users LEFT JOIN groupings ON groupings.id=users.group_id WHERE users.type = 2 AND users.org_id="+id+"").then((res) =>{

        result(null, res[0]);
    });
    
};

module.exports= Manager;