const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { find } = require('./models/placementlist.js');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'css')));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Students', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('connectedd!!!')})
.catch(e=>{console.log(e)});

const students = require('./models/placementlist.js');
const users = require('./models/usermodel.js');
 
isCompany=false;


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/placements/:year',(req,res)=>{
    let {year} = req.params;
     const id = parseInt(year);
    students.find({year : id})
    .then((list)=>{
        res.render('placement.ejs',{list});
    }).catch(e=>{console.log(e)});
    
})


app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.post('/signup',(req,res)=>{
    const {username,password,isStudent} = req.body;
    const newUser = new users({name : username,password : password , isStudent : isStudent});
    newUser.save().then(()=>{
        res.redirect('/');
    })
   
})

app.get('/company/:id',(req,res)=>{
    const {id} = req.params;
    students.find({company : id})
    .then(list=>{
        isCompany=true;
        res.render('placement.ejs',{list,isCompany});
    }).catch(e=>{console.log(e)});
})

let nextList = [];

app.post('/placements',(req,res)=>{
    const {username,password : pass} = req.body;
    users.find({name : username})
    .then(b=>{
        if(b[0].password == pass){
            if(b[0].isStudent == true){
                students.find({}).then(list=>{
                    nextList=list;
                    isCompany=false;
                    res.render('placement.ejs',{list,isCompany});
                    })
            }else{
                res.render('company.ejs');
            }          
        }else{
            res.redirect('/');
        }
    }).catch(()=>{res.redirect('/')});
})

app.get('/add',(req,res)=>{
    res.render('add.ejs')
})

app.post('/add',(req,res)=>{
    students.insertMany([
        req.body
    ]).then(()=>{
        console.log("success");
    })
    res.render('company.ejs');
})

app.listen(3000,()=>{
    console.log('port 3000 started!!');
})


