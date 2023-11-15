const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicle.controller');
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
            //console.log(csvData);
            
            // using forEach
            csvData.forEach(myFunction);

            function myFunction(item) {
            
                const propertyNames = 'vehicle_number,boarding_point,destination_point,vehicle_route,user_id,org_id';
                const propertyValues = Object.values(item); 
            
                const valuesWrappedInQuotes = propertyValues.map(date => `'${date}'`);
                //const withCommasInBetween = valuesWrappedInQuotes.join(',')
                const withCommasInBetween = 'N'+valuesWrappedInQuotes.join(',N')

                let query = `insert into vehicles (`+propertyNames+`) values (`+withCommasInBetween+`)`;

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

// Retrieve all vehicles
router.get('/', vehicleController.findAll);

// Create a new vehicle
router.post('/', vehicleController.create);

// Retrieve a single vehicle with id
router.get('/:id', vehicleController.findById);

// Update a vehicle with id
router.put('/:id', vehicleController.update);

// Delete a vehicle with id
router.delete('/:id', vehicleController.delete);

// Retrieve vehicles of org with id
router.get('/vehicles/:id', vehicleController.findByOrgVehId);

module.exports = router