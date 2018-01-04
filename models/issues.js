// Schema for issues

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var swetime = new Date(Date.now() + 60 * 60 * 1000);



//Defining schema
var IssuesSchema = new Schema({
    status: { type: Boolean, default: 'false' },
    description: String,
    created: { type : Date, default: swetime }
    
});

module.exports = mongoose.model("Issues", IssuesSchema);
