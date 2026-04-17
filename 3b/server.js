const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Serve static frontend
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
    console.log("Database Connected Successfully!!"); 
}).catch(err => { 
    console.log('Could not connect to the database', err); 
    process.exit(); 
});

app.get('/api', (req, res) => { 
    res.json({"message": "Hello Crud Node Express"}); 
});

const UserRoute = require('./app/routes/User');
app.use('/user', UserRoute);

const PORT = 3000;
app.listen(PORT, () => { 
    console.log(`Server is runnig on :http://localhost:${PORT}`); 
});
