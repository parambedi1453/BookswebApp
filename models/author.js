const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    }
})

module.exports = mongoose.model('Author',authorSchema)

// we can import this schema in order to create new authors in the application