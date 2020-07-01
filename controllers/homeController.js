"use strict";

const AdminList = require("../models/Admin");

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses,
    date : new Date(),
    owner: "Tim Hickey"
  });
};

exports.showBio = (req, res) => {
  res.render("bio");
}

exports.showSignUp = (req, res) => {
  res.render("contact", {
    date: new Date(),
  });
};
//exports.showgridEditor = (req, res) => {
 // res.render("gridEditor");
//};

exports.postedSignUpForm = (req, res) => {
  let formData = req.body
  res.render("thanks",{formData:formData});
};

exports.showAbout = (req, res) => {
  res.render("about");
};
exports.showProfile = (req,res) => {
  res.render("profile");
};

exports.showAndrew = (req,res) => {
  res.render("andrew");
};

exports.showJulian = (req,res) => {
  res.render("julian");
}
exports.showTestProf = (req,res) => {
  res.render("test_prof_profile");
}
exports.showTestSchedule = (req,res) => {
  res.render("test_class_schedule");
}

exports.showSchedule = (req, res) =>{
  res.render("pro");
}

exports.showThanks=(req,res)=> {
  res.render("thanks");
}

exports.addAdmin = async(req,res,next) =>{
  try {
    await AdminList.create({googleemail: req.body.email})
    res.redirect('/admin')
  }
  catch(e) {
    next(e)
  }
};

exports.removeAdmin = async(req,res,next) => {
  AdminList.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/admin')
    })
    .catch(error => {
      console.log(`Error deleting admin by email: ${error.message}`);
      next();
    });
}

exports.showAdmin = (req, res, next) => {
  AdminList.find({})
    .exec()
    .then(admins => {
      res.render("admin", {
        admins: admins
      });
    })
    .catch(error => {
      next(error);
    });
};
