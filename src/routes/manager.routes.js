const express = require('express')
const router = express.Router()
const managerController = require('../controllers/manager.controller');
var db = require('./../../config/db.config');

//const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
 
 
//use express static folder
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 

router.post('/import', upload.single("uploadfile"), (req, res) =>{

    //console.log(__dirname + '/uploads/' + req.file.filename);
    try{
        const filePath = 'uploads/' + req.file.filename;
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
            console.log(csvData);
            
            // using forEach
            csvData.forEach(myFunction);

            async function myFunction(item) {

                var name = `'${item[0]}'`;
                //console.log(item[0]);
                let org_id = '';
            
                await db.query("select * from organizations WHERE name="+name+"").then(async function(res) {
            
                        if(!res[0] || res[0].length < 1 || !res[0][0].id){
            
                            let query1 = 'insert into organizations (name) values (N'+name+'); SELECT SCOPE_IDENTITY() as id';
                            const res = await db.query(query1);
                            org_id = res[0][0].id;
            
                        }else{
            
                            org_id = res[0][0].id;
                            
                        }
                });
                //console.log('ttt');
                //console.log(org_id);

                item.org_id = org_id;
                //item.name = '';
            
                item.type = 2;
                const propertyNames = 'name,email,phone,org_id,type';
                const propertyValues = Object.values(item); 
                
            
                const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
                //const withCommasInBetween = valuesWrappedInQuotes.join(',')
                const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')

                let query = `insert into users (`+propertyNames+`) values (`+withCommasInBetween+`)`;

                await db.query(query).then((res) =>{
                    //res.json(result[0]);
                    console.log(res);
                    //result(null, res[0]);
                    console.log("CSV imported successfully!");
                    
                }).catch(err => {
                    console.log(err),
                        res.status(500).json({
                            error: err
                        });
                })
            }

            res.json({error:false,message:"CSV imported successfully!"});
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
        stream.pipe(csvStream);
    }
    catch (err) {
            console.log(err),
            res.status(500).json({
                error: err
            });

    } 
    
});


// Retrieve all managers
router.get('/', managerController.findAll);

// Create a new manager
router.post('/', managerController.create);

// Retrieve a single manager with id
router.get('/:id', managerController.findById);

// Update a manager with id
router.put('/:id', managerController.update);

// Delete a manager with id
router.delete('/:id', managerController.delete);

// Retrieve passengers of manager with id
router.get('/users/:id', managerController.findByMgrId);

// Retrieve managers of org with id
router.get('/managers/:id', managerController.findByOrgMgrId);

module.exports = router