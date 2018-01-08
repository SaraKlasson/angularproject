// Schema for Rooms

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var swetime = new Date(Date.now() + 60 * 60 * 1000);



//Defining schema
var RoomsSchema = new Schema({
    status: { type: Boolean, default: 'false' },
    description: String,
    coordinates: String,
    created: { type : Date, default: swetime }
    
  
    
    
});

module.exports = mongoose.model("Rooms", RoomsSchema);
