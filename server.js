const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require auth routes
const authRoutes = require('./src/routes/auth.routes')

// using as middleware
app.use('/api/v1/auth', authRoutes)

// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')

// using as middleware
app.use('/api/v1/employees', employeeRoutes)

// Require passenger routes
const passengerRoutes = require('./src/routes/passenger.routes')

// using as middleware
app.use('/api/v1/passengers', passengerRoutes)


// Require group routes
const groupRoutes = require('./src/routes/group.routes')

// using as middleware
app.use('/api/v1/groups', groupRoutes)


// Require vehicle routes
const vehicleRoutes = require('./src/routes/vehicle.routes')

// using as middleware
app.use('/api/v1/vehicles', vehicleRoutes)

// Require manager routes
const managerRoutes = require('./src/routes/manager.routes')

// using as middleware
app.use('/api/v1/managers', managerRoutes)

// Require driver routes
const driverRoutes = require('./src/routes/driver.routes')

// using as middleware
app.use('/api/v1/drivers', driverRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/*

const express = require('express');
const bodyParser = require('body-parser');

const { poolPromise } = require('./config/db.config'); 
const sql = require('mssql')  

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/',async (req, res) => {

  try {  
    console.log('kkkll') 
    const pool = await poolPromise  
    const result = await pool.request()  
    .query('select * from users',function(err, profileset){  
    if (err)  
    {  
      console.log('kkkll222') 
    console.log(err)  
    }  
    else {  
      console.log('kkkll444') 
      console.log(profileset.recordset)

    var send_data = profileset.recordset;  
    res.send(send_data);  
    }  
    })  
    } catch (err) {  
      console.log('kkkll333') 
    res.status(500)  
    res.send(err.message)  
    }  
  //res.send("Hello World");
});

// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')

// using as middleware
app.use('/api/v1/employees', employeeRoutes)

// Require passenger routes
const passengerRoutes = require('./src/routes/passenger.routes')

// using as middleware
app.use('/api/v1/passengers', passengerRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});*/