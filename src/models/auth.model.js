'user strict';
//var dbMysql = require('./../../config/db.config');
var dbMssql = require('./../../config/db.config');
const bcrypt = require("bcrypt")

//Auth object create
var Auth = function(user){
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

Auth.login = async function (newEmp, result) {   

    let query =  "select id,org_id,name,email,password,phone,unique_identity,pickup,dropoff,minimum_time,maximum_time,type from users WHERE email = "+`'${newEmp.email}'`+"";

    const res = await dbMssql.query(query);

    if (res[0].length === 0) {
        //console.log("User not found");
        result(null, '101');
    }else{

        const validPassword = await bcrypt.compare(newEmp.password, res[0][0].password);

       if (!validPassword){
            console.log("Invalid Password");
            result(null, '102');
        }else{
            result(null, res[0][0]);
        } 
    }

};

Auth.update = async function(newEmp, result){

    let query ="";
    if (typeof newEmp.password == 'undefined' || newEmp.password == '') {
        
         query = "UPDATE users SET name = N"+`'${newEmp.name}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+"";

    } else {

        const hashPassword = await bcrypt.hash(newEmp.password, 10);
        query = "UPDATE users SET name = N"+`'${newEmp.name}'`+", password = N"+`'${hashPassword}'`+", phone = N"+`'${newEmp.phone}'`+" WHERE id = "+`'${newEmp.id}'`+"";

    }

    dbMssql.query(query).then((res) =>{
        //res.json(result[0]);
        console.log(res);
        result(null, res[0]);
    });

  };

  Auth.updateUserInGroup = function(newEmp, result){

        var user_ids = newEmp.user_ids
        user_ids.toString();

        //let query = "UPDATE users SET group_id = "+`'${newEmp.group_id}'`+" WHERE id = "+`'${newEmp.user_id}'`+""
        let query = "UPDATE users SET group_id = "+`'${newEmp.group_id}'`+" WHERE id IN ("+user_ids+")"
        dbMssql.query(query).then((res) =>{
            //res.json(result[0]);
            console.log(res);
            result(null, res[0]);
        });

  };



module.exports= Auth;