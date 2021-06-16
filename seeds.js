const mongoose = require('mongoose');
const { insertMany } = require('./models/placementlist');
mongoose.connect('mongodb://localhost:27017/placement', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('connectedd!!!')})
.catch(e=>{console.log(e)});
const student = require('./models/placementlist.js');

// name : String,
//     roll_no : String,
//     age : Number,
//     year : Number,
//     company : String,
//     salary : String,
//     branch : String,
//     gpa : Number


// placementlist.insertMany([
//      {name : 'sreenath'  ,roll_no : 'B119030' ,age : 20 ,year : 2020,company : 'google' ,salary :100000 , branch : 'cse' ,gpa :10 }
// ]).then((r)=>{console.log(r)});

const sreenath = new student({name : 'sreenath'  ,roll_no : 'B119030' ,age : 20 ,year : 2020,company : 'google' ,salary :100000 , branch : 'cse' ,gpa :10 });
sreenath.save().then(e=>{
    console.log("inserted!!!!");
    console.log(e);
})

