/* Import */
var express         = require("express");
var bodyParser      = require("body-parser");
var path            = require("path");
var mongoose        = require("mongoose");


// Connec to MongoDB database
// mongoose.connect("mongodb://localhost/issues", {useMongoClient: true});
var connection = mongoose.connect("mongodb://sakl:password@ds131137.mlab.com:31137/issues", {useMongoClient: true});

mongoose.Promise = global.Promise;

//Import schema
var Issues = require("./models/issues"); 

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


// REST-api for Issues ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Send all issues from databse ///////////////////////////////
app.get("/api/issues", function (req, res) {
    Issues.find(function(err, Issues){
        if (err) {
            res.json(err);
        } else { 
            res.json(Issues);
               }
    })
    
});

// Read specifik issue by id ///////////////////////////////// not implemented in frontend 
app.get("/api/issues/:id", function (req, res) {
    Issues.findById(req.params.id, function(err, Issues){
        if(err) {
            res.json(err);
        } else {
            res.json(Issues);
        }
    });
});


// Add issue to database /////////////////////////////////////
app.post("/api/issues/add", function (req, res) {

    var issue = new Issues();
    issue.description = req.body.description;

    issue.save(function(err){
        if(err) {
            res.json(err);
        } else {
            res.json({ message: "Ärende lagrat!"})
        }
    });
});


// Edit issue by id ///////////////////////////////////////////
app.put('/api/issues/edit/:id', function (req, res) {  
var conditions = { _id: req.params.id,
 };

Issues.update(conditions, req.body)
.then(doc =>{
if(!doc) { return res.status(404).end(); }
return res.status(200).json(doc);
})
.catch (err => next(err));
});


// Delete issue by id //////////////////////////////////////
app.delete("/api/issues/delete/:id", function (req, res) {
    Issues.remove({_id: req.params.id}, function(err){
        if(err) {
            res.json(err);
        } else {
            res.json ({ message: "Ärende raderat" })
        }
    })
});

