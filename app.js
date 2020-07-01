"use strict";

// connect express, controllers, ejs
const express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

const User = require("./models/User");
  //Admin = require("./models/Admin");
// connect with mongoose
const mongoose = require("mongoose");
mongoose.connect(
  //'mongodb://localhost/timetable',
  process.env.MONGODB_URI,
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

// connect with authentication
const authRouter = require("./Routes/authentication")
app.use(authRouter)

// check mongoDB
const db = mongoose.connection;
db.on('error', ()=>console.log("connection error"))
db.once('open', ()=>console.log("We connected at " +new Date()))

// enable ejs
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

// render every pages
app.get("/about",homeController.showAbout);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
//app.get("/gridEditor", homeController.showgridEditor);
app.get("/bio", homeController.showBio);
app.get("/andrew", homeController.showAndrew);
app.get("/julian",homeController.showJulian);
app.get("/test_prof_profile",homeController.showTestProf);
app.get("/test_class_schedule",homeController.showTestSchedule);
app.get("/profile", homeController.showProfile);
app.get("/pro/:id", (req, res) => {
    Grid.findById(req.params.id, (err, doc) => {
        res.render('pro', {
            individualGrid: doc
        })
    })
});



app.get("/admin", homeController.showAdmin);
app.get("/thanks", homeController.showThanks);
//app.post("/contact", homeController.postedSignUpForm);

const Contact=require("./models/Contact");
app.get("/showContacts",
 async(req,res) => {
   try{
     res.locals.contacts = await Contact.find({})
     res.render('showContacts')
   }
   catch(e) {
     console.log("Error:"+e)
     console.dir(theError)
     res.send("There was an error in /showContacts!")
   }
 });

app.post('/contact',
  async(req,res,next) => {
    try {
      let name = req.body.name
      let email = req.body.email
      let message = req.body.message
      let newContact = new Contact({name:name, email:email, message:message})
      await newContact.save()
      res.redirect('/thanks')
    }
    catch(e) {
      next(e)
    }
  });

app.post('/admin', homeController.addAdmin);
app.delete("/admin/:id/delete", homeController.removeAdmin);

  const Grid=require("./models/Grid");
  app.get("/",
  async(req, res) => {
    try{
      res.locals.grid_db = await Grid.find().sort({department:1});
      res.render('index')
    }
    catch(e) {
      console.log("Error:"+e);
      console.dir(theError);
      res.send("There was an error in /index!");
    }
  });

  app.get("/sort/:field/:dir",
  async(req, res) => {
    try{
      let f = req.params.field
      let d = req.params.dir
      let sortmethod = {};
      sortmethod[f]=d;
      res.locals.grid_db = await Grid.find().sort(sortmethod);
      res.render('index')
    }
    catch(e) {
      console.log("Error:"+e);
      console.dir(theError);
      res.send("There was an error in /index!");
    }
  });
  app.get("/testShowGrid",
  async(req,res) => {
   try{
     res.locals.grid_db = await Grid.find({})
     res.render('testShowGrid')
   }
   catch(e) {
     console.log("Error:"+e);
     console.dir(theError);
     res.send("There was an error in /testShowGrid!");
   }
 });

 app.post("/searchGrid",
 async(req, res) => {
   try{
   if(req.body.prof_name != "" && req.body.courseid != ""){
    let prof_name = req.body.prof_name
    let courseid = req.body.courseid
    res.locals.grid_db = await Grid.find({prof_name:prof_name,courseid:courseid}).sort({department:1});
    res.render('index')
   }
   else if(req.body.prof_name != ""){
    let prof_name = req.body.prof_name
    res.locals.grid_db = await Grid.find({prof_name:prof_name}).sort({department:1});
    res.render('index')
   }
   else if(req.body.courseid != ""){
    let courseid = req.body.courseid
    res.locals.grid_db = await Grid.find({courseid:courseid}).sort({department:1});
    res.render('index')
  }

   }
   catch(e) {
     console.log("Error:"+e);
     console.dir(theError);
     res.send("There was an error in /index!");
   }
 });


 app.post('/addCourse',
  async(req,res,next) => {
    try {
        let newGrid = new Grid();
        newGrid.prof_name = req.body.prof_name
        newGrid.department = req.body.department
        newGrid.courseid = req.body.courseid
        newGrid.prof_hours = req.body.prof_hours
        newGrid.prof_office = req.body.prof_office

        newGrid.Monday9to10 = req.body.Monday9to10
        newGrid.Monday10to11 = req.body.Monday10to11
        newGrid.Monday11to12 = req.body.Monday11to12
        newGrid.Monday12to13 = req.body.Monday12to13
        newGrid.Monday13to14 = req.body.Monday13to14
        newGrid.Monday14to15 = req.body.Monday14to15
        newGrid.Monday15to16 = req.body.Monday15to16
        newGrid.Monday16to17 = req.body.Monday16to17
        newGrid.Tuesday9to10 = req.body.Tuesday9to10
        newGrid.Tuesday10to11 = req.body.Tuesday10to11
        newGrid.Tuesday11to12 = req.body.Tuesday11to12
        newGrid.Tuesday12to13 = req.body.Tuesday12to13
        newGrid.Tuesday13to14 = req.body.Tuesday13to14
        newGrid.Tuesday14to15 = req.body.Tuesday14to15
        newGrid.Tuesday15to16 = req.body.Tuesday15to16
        newGrid.Tuesday16to17 = req.body.Tuesday16to17
        newGrid.Wednesday9to10 = req.body.Wednesday9to10
        newGrid.Wednesday10to11 = req.body.Wednesday10to11
        newGrid.Wednesday11to12 = req.body.Wednesday11to12
        newGrid.Wednesday12to13 = req.body.Wednesday12to13
        newGrid.Wednesday13to14 = req.body.Wednesday13to14
        newGrid.Wednesday14to15 = req.body.Wednesday14to15
        newGrid.Wednesday15to16 = req.body.Wednesday15to16
        newGrid.Wednesday16to17 = req.body.Wednesday16to17
        newGrid.Thursday9to10 = req.body.Thursday9to10
        newGrid.Thursday10to11 = req.body.Thursday10to11
        newGrid.Thursday11to12 = req.body.Thursday11to12
        newGrid.Thursday12to13 = req.body.Thursday12to13
        newGrid.Thursday13to14 = req.body.Thursday13to14
        newGrid.Thursday14to15 = req.body.Thursday14to15
        newGrid.Thursday15to16 = req.body.Thursday15to16
        newGrid.Thursday16to17 = req.body.Thursday16to17
        newGrid.Friday9to10 = req.body.Friday9to10
        newGrid.Friday10to11 = req.body.Friday10to11
        newGrid.Friday11to12 = req.body.Friday11to12
        newGrid.Friday12to13 = req.body.Friday12to13
        newGrid.Friday13to14 = req.body.Friday13to14
        newGrid.Friday14to15 = req.body.Friday14to15
        newGrid.Friday15to16 = req.body.Friday15to16
        newGrid.Friday16to17 = req.body.Friday16to17

      await newGrid.save()
      res.redirect('/')
    }
    catch(e) {
      next(e)
    }
  });
  app.post('/deleteCourse',
  async(req,res,next) => {
    try {
      let prof_name = req.body.prof_name
      let courseid = req.body.courseid
      await Grid.deleteOne({prof_name:prof_name, courseid:courseid})
      res.redirect('/')
    }
    catch(e) {
      next(e)
    }
  });

  app.post('/addTA',
  async(req,res,next) => {
    try {
      let prof_name = req.body.prof_name
      let courseid = req.body.courseid
      let ta_name = req.body.ta_name
      let ta_hours = req.body.ta_hours
      let course = await Grid.findOne({prof_name:prof_name, courseid:courseid})
      course.tas.push({ta_name:ta_name, ta_hours:ta_hours})
      await course.save()
      res.redirect('/')
    }
    catch(e) {
      next(e)
    }
  });

  app.post('/delTA',
  async(req,res,next) => {
    try {
      let prof_name = req.body.prof_name
      let courseid = req.body.courseid
      let name = req.body.ta_name
      let course = await Grid.findOne({prof_name:prof_name, courseid:courseid})
      let count = 0;
      course.tas.forEach(ta => {
        if(ta.ta_name == name){
          course.tas.splice(count,1);
        }
        count = count +1;
      })
      await course.save()
      res.redirect('/')
    }
    catch(e) {
      next(e)
    }
  });

  //TODO
app.post("/pro/add", (req, res, next) => {
    console.log(req.body.Monday9to10);
    if(req.body.Monday9to10 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday9to10: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["9am to 10am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday10to11 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday10to11: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["10am to 11am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });

    }

    if(req.body.Monday11to12 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday11to12: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["11am to 12pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday12to13 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday12to13: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["12pm to 1pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday13to14 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday13to14: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["1pm to 2pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday14to15 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday14to15: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["2pm to 3pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday15to16 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday15to16: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["3pm to 4pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Monday16to17 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Monday16to17: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Monday"], timeScheduled: ["4pm to 5pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday9to10 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday9to10: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["9am to 10am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday10to11 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday10to11: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["10am to 11am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday11to12 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday11to12: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["11am to 12pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday12to13 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday12to13: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["12pm to 1pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday13to14 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday13to14: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["1pm to 2pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday14to15 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday14to15: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["2pm to 3pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday15to16 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday15to16: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["3pm to 4pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Tuesday16to17 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Tuesday16to17: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Tuesday"], timeScheduled: ["4pm to 5pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday9to10 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday9to10: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["9am to 10am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday10to11 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday10to11: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["10am to 11am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday11to12 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday11to12: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["11am to 12pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday12to13 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday12to13: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["12pm to 1pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday13to14 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday13to14: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["1pm to 2pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday14to15 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday14to15: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["2pm to 3pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday15to16 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday15to16: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["3pm to 4pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Wednesday16to17 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Wednesday16to17: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Wednesday"], timeScheduled: ["4pm to 5pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday9to10 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday9to10: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["9am to 10am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday10to11 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday10to11: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["10am to 11am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday11to12 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday11to12: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["11am to 12pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday12to13 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday12to13: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["12pm to 1pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday13to14 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday13to14: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["1pm to 2pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday14to15 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday14to15: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["2pm to 3pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday15to16 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday15to16: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["3pm to 4pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Thursday16to17 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Thursday16to17: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Thursday"], timeScheduled: ["4pm to 5pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday9to10 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday9to10: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["9am to 10am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday10to11 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday10to11: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["10am to 11am"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday11to12 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday11to12: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["11am to 12pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday12to13 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday12to13: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["12pm to 1pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday13to14 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday13to14: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["1pm to 2pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday14to15 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday14to15: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["2pm to 3pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday15to16 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday15to16: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["3pm to 4pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    if(req.body.Friday16to17 === "YES"){
        console.log(req.body._id);
        Grid.findOneAndUpdate({_id:req.body._id}, {
            Friday16to17: 0
        }, {new : true}, (err , doc) => {
            if (!err){
                //res.redirect('/');
            }else{
                console.log(err);
            }
        });

        User.findOneAndUpdate({_id: req.body.userID}, {
            $push: {courseScheduled: [req.body.courseid], dateScheduled: ["Friday"], timeScheduled: ["4pm to 5pm"]}
        }, {new: true}, (err, doc) => {
            if (!err){

            }else{
                console.log(err);
            }
        });
    }

    res.render('success_schedule');
});


app.get('/releaseSchedule/:id', async(req, res) => {
    //TODO: BUG!!!
    let num = req.params.id;
    //console.log(num);
    let theUser = await User.findOne({_id : req.user._id});
    //console.log(theUser.courseScheduled);
    let theCourseArray = theUser.courseScheduled.slice(0, num);
    theCourseArray.push(theUser.courseScheduled.slice(num+1));
    let theDateArray = theUser.dateScheduled.slice(0, num);
    theDateArray.push(theUser.dateScheduled.slice(num+1));
    let theTimeArray = theUser.timeScheduled.slice(0, num);
    theTimeArray.push(theUser.timeScheduled.slice(num+1));


    console.log(theCourseArray);
    console.log(theDateArray);
    console.log(theTimeArray);



    User.findOneAndUpdate({_id: req.user._id}, {
        $set : {courseScheduled: theCourseArray}
    }, {new: true});
    User.findOneAndUpdate({_id: req.user._id}, {
        $set : {dateScheduled: theDateArray}
    }, {new: true});
    User.findOneAndUpdate({_id: req.user._id}, {
        $set : {timeScheduled: theTimeArray}
    }, {new: true});
    res.redirect('../profile');
});


app.get('/updateCourse', async(req, res) => {
    res.locals.grid_db = await Grid.find().sort({department:1});
    res.render("updateCourse");
});

app.get('/success_schedule', (req, res) => {
    res.render('success_schedule');
});

app.get('/updateCourse/:id', (req, res) => {
   Grid.findById(req.params.id, (err, doc) => {
       res.render('updateSpecificClass', {
           specificClass: doc
       })
   })
});

app.post('/updateSpecificClass/update', (req, res, next) => {
   Grid.findOneAndUpdate({_id: req.body._id}, req.body, {new : true}, (err, doc) => {
       if(!err){
           res.redirect("/");
       }else{
           console.log(err);
       }
   })
});


app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

/*
app.use('/professor_profile_schedule/:userId',
    async(req, res, next) => {
        try{
            let userId = req.params.userId
            res.locals.profile = await Grid.findOne({_id:userId})
            res.render('professor_profile_schedule')
        }
        catch(e){
            console.log('Error in /profile/userId:')
            next(e)
        }
    }
)

 */



/*
require("./models/Grid");
var professor = mongoose.model('Grid');
//ar professor = mongoose.model('Grid');
app.get('/professor_profile_schedule/:userId', (req, res) =>
    professor.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("professor_profile_schedule", {
            });

        }
    })
)

//app.get('/professor_profile_schedule', homeController.showSchedule);

 */


/*
router.get('/:id', (req, res) => {
  professor.findById(req.params.id, (err, doc) =>{
    if(!err){
      res.render("professor/addOrEdit", {
        viewTitle:"Update Professor",
        prof: doc
      });

    }
  });
});

 */


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports=app
