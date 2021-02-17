const express = require('express');

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('employee/login',{
        viewTitle : "Login"
    });
    console.log(req.body);
    // if(req.body) {
    //     res.render('employee/manageEmp',{
    //         viewTitle : "Insert Employee"
    //     });
    // }
});

router.post('/employee', (req, res) => {
    res.render('employee/manageEmp',{
        viewTitle : "Insert Employee"
    });
});

router.post('/',  (req, res) => {
    insertRecord(req, res); 
});

function insertRecord(req,res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.place = req.body.place;
    employee.save((err, docs) => {
        if(err) { console.log("Error : " + err);}
        else res.redirect('employee/list');
    });
};

router.get('/employee/list', (req, res) => {
    Employee.find((err, docs)=> {
        if(!err) {
            res.render("employee/list", {
                list: docs
            });
            console.log(docs);
        }else{
            console.log("###ERROR###" + err);
        }
    })
});

module.exports = router;