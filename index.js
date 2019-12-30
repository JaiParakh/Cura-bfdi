const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
var path = require('path');
var hbs = require('hbs');
var cors = require('cors');

//Firebase Code Begins.
var firebase = require("firebase");
var config = require('./myconfig.json');

require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp(config);

var db = firebase.database();

//Express Code.
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('views',path.join(__dirname,"views"));
app.set("view engine","hbs");

//CRUD FOR MEDICINES.
app.post('/add-medicine', (req, res) => {
    //Python.
    var med_name = "dolo";

    fs.writeFile('input.txt', med_name, (err, res) => {
        if(err) throw err;
        //console.log(res);
        var spawn = require("child_process").spawn; 
        var process = spawn('python',["./medicine.py"] );
        process.stdout.on('data', function (data) {
            //res.send(data.toString());
            //console.log(data);
            /*fs.readFileSync('output.txt', (err, res) => {
                console.log(res);
            });*/
            // console.log(data);
            console.log(data.toString());

            //use ajax in the front end and send the data back.
            //return res.send(data.toString());
        });
    });
    res.send("Medicine added");
});

app.delete('/delete', (req, res) => {
    let userId = req.data.id;
    let userRef = db.ref('dummy/medicine/' + userId);
    userRef.remove()
    console.log("Item Deleted.");
});

app.get('/profile', (req, res) => {
    var arr = [];
    db.ref("dummy/medicine").on('value', (snapshot) =>{
        //snapshot.val();
        snapshot.forEach(item=> {
            
            var temp = {
                id: item.key,
                med_name: item.val().med_name,
                salts: item.val().salt
            }
            arr.push(temp);
            //console.log(temp);
        });
        
        console.log(arr);

        //Send all the database to front end.
        res.send(arr);
        
        //res.send("Home Page" + arr);    
        //return arr;
    });
});


//BASIC FRONT-END.
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/medicine', (req, res) => {
    res.send("Medicine");
});

app.get('/food', (req, res) => {
    res.send("FoodItems");
});


//ALLERGEY TEST.

app.post('/food-add', (req, res) => {
    var entry = {
        med_name: req.body.food_item,
        salt: req.body.food_ingridient
    }

    let data = JSON.stringify(entry);
    fs.writeFileSync('input.json', data);

    console.log(entry);

    var spawn = require("child_process").spawn; 
        var process = spawn('python',["./foodadd.py"] );
        process.stdout.on('data', function (data) {
            //res.send(data.toString());
            //console.log(data);
            /*fs.readFileSync('output.txt', (err, res) => {
                console.log(res);
            });*/
            // console.log(data);
            console.log(data.toString());

            return res.json({data: data.toString()});

            //use ajax in the front end and send the data back.
            //return res.send(data.toString());
        });
});

app.post('/food-allergey', (req, res) => {
    var spawn = require("child_process").spawn; 
        var process = spawn('python',["./food.py"] );
        process.stdout.on('data', function (data) {
            //res.send(data.toString());
            //console.log(data);
            /*fs.readFileSync('output.txt', (err, res) => {
                console.log(res);
            });*/
            // console.log(data);
            //console.log(data.toString());

            //use ajax in the front end and send the data back.
            
        });
        return res.json({success: true});
});

app.post('/medicine-allergey', (req, res) => {
    //console.log("t");
    var med_name = req.body.med;
    console.log(med_name);

    fs.writeFile('input.txt', med_name, (err, re) => {
        if(err) throw err;
        //console.log(res);
        var spawn = require("child_process").spawn; 
        var process = spawn('python',["./medicineChance.py"] );
        process.stdout.on('data', function (data) {
            //res.send(data.toString());
            //console.log(data);
            /*fs.readFileSync('output.txt', (err, res) => {
                console.log(res);
            });*/
            // console.log(data);
            console.log(data.toString());

            //use ajax in the front end and send the data back.
            return res.json({data: data.toString()});
        });
    });
});


//EXPRESS SERVER.
const port = 5000;
app.listen(port,() => {
    console.log("Server Started on " + port);
});

