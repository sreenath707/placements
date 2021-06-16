const mongoose = require('mongoose');
const { insertMany } = require('./placementlist');
mongoose.connect('mongodb://localhost:27017/Students', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('connectedd!!!')})
.catch(e=>{console.log(e)});

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,        
    },
    password : {
        type : String,
        required : true
    },
    isStudent : {
        type : Boolean,
        default : true
    }
});

const user = mongoose.model('Users',userSchema);

module.exports = user;