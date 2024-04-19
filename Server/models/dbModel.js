const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    description: {type:String},
})

const bookrecords =mongoose.model("bookrecords",bookSchema);
const databasemodel = {
    bookrecords
} 
module.exports =databasemodel