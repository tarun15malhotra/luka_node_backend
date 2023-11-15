
const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver.controller');
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
            data.push(req.body.user_id);
            data.push(req.body.org_id);
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            console.log(csvData);
            
            // using forEach
            csvData.forEach(myFunction);

            function myFunction(item) {
            
                item.type = 3;
                const propertyNames = 'name,email,phone,user_id,org_id,type';
                const propertyValues = Object.values(item); 
            
                const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
                //const withCommasInBetween = valuesWrappedInQuotes.join(',')
                const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')

                let query = `insert into users (`+propertyNames+`) values (`+withCommasInBetween+`)`;

                db.query(query).then((res) =>{
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

// Retrieve all drivers
router.get('/', driverController.findAll);

// Create a new driver
router.post('/', driverController.create);

// Retrieve a single driver with id
router.get('/:id', driverController.findById);

// Update a driver with id
router.put('/:id', driverController.update);

// Delete a driver with id
router.delete('/:id', driverController.delete);

// Retrieve passengers of driver with id
router.get('/users/:id', driverController.findByDrId);

// Retrieve drivers of org with id
router.get('/drivers/:id', driverController.findByOrgDrId);

module.exports = router