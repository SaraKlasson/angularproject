/* Import */
var express         = require("express");
var bodyParser      = require("body-parser");
var path            = require("path");
var mongoose        = require("mongoose");


// Connec to MongoDB database
mongoose.connect("mongodb://localhost/rooms", {useMongoClient: true});
//var connection = mongoose.connect("mongodb://sakl:password@ds131137.mlab.com:31137/rooms", {useMongoClient: true});

mongoose.Promise = global.Promise;

//Import schema
var Rooms = require("./models/rooms"); 

// Create instance of express
var app = express();  

/* 
"Middleware" 
Makes webbservice avaiable from other domains
*/
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();  
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// Create static search path
app.use(express.static(path.join(__dirname, 'public')));

// Port for connection
var port = Number(process.env.PORT || 3000);



// Start server
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});


// REST-api for rooms ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Send all rooms from databse ///////////////////////////////
app.get("/api/rooms", function (req, res) {
    Rooms.find(function(err, rooms){
        if (err) {
            res.json(err);
        } else { 
            res.json(rooms);
               }
    })
    
});

// Read specifik room by id ///////////////////////////////// not implemented in frontend 
app.get("/api/rooms/:id", function (req, res) {
    Rooms.findById(req.params.id, function(err, rooms){
        if(err) {
            res.json(err);
        } else {
            res.json(rooms);
        }
    });
});


// Add room to database /////////////////////////////////////
app.post("/api/rooms/add", function (req, res) {

    var room = new Rooms();
    room.description = req.body.description;
    room.coordinates = req.body.coordinates;

    room.save(function(err){
        if(err) {
            res.json(err);
        } else {
            res.json({ message: "Rum lagrat!"})
        }
    });
});


// Book room by id ///////////////////////////////////////////
app.put('/api/rooms/book/:id', function (req, res) {  
var conditions = { _id: req.params.id,
 };

Rooms.update(conditions, req.body)
.then(doc =>{
if(!doc) { return res.status(404).end(); }
return res.status(200).json(doc);
})
.catch (err => next(err));
});


// Delete room by id //////////////////////////////////////
app.delete("/api/rooms/delete/:id", function (req, res) {
    Rooms.remove({_id: req.params.id}, function(err){
        if(err) {
            res.json(err);
        } else {
            res.json ({ message: "Rum raderat" })
        }
    })
});

