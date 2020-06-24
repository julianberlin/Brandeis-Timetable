"use strict";

// connect express, controllers, ejs
const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

// connect with mongoose
const mongoose = require("mongoose");
mongoose.connect(
  'mongodb://localhost/timetable',
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

// connect with authentication
const authRouter = require("./routes/authentication")
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


// render every pages
app.get("/about",homeController.showAbout);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/gridEditor", homeController.showgridEditor);
app.get("/bio", homeController.showBio);
app.get("/andrew", homeController.showAndrew);
app.get("/julian",homeController.showJulian);
app.get("/test_prof_profile",homeController.showTestProf);
app.get("/test_class_schedule",homeController.showTestSchedule);
app.get("/profile", homeController.showProfile);
app.get("/pro", homeController.showSchedule);
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
      res.redirect('/showContacts')
    }
    catch(e) {
      next(e)
    }
  });

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

 app.post('/gridEditor_addition',
  async(req,res,next) => {
    try {
      let prof_name = req.body.prof_name
      let department = req.body.department
      let courseid = req.body.courseid
      let prof_hours = req.body.prof_hours
      let prof_office = req.body.prof_office
      let newGrid = new Grid({prof_name:prof_name, department:department, courseid:courseid, prof_hours:prof_hours, prof_office:prof_office})
      //add let tas = req.body.tas, let bugs = req.body.bugs, tas:tas, bugs:bugs
      await newGrid.save()
      res.redirect('/gridEditor')
    }
    catch(e) {
      next(e)
    }
  });
  app.post('/gridEditor_deletion',
  async(req,res,next) => {
    try {
      let prof_name = req.body.prof_name
      let courseid = req.body.courseid
      await Grid.deleteOne({prof_name:prof_name, courseid:courseid})
      res.redirect('/gridEditor')
    }
    catch(e) {
      next(e)
    }
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
