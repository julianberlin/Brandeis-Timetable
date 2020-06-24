"use strict";

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
exports.showgridEditor = (req, res) => {
  res.render("gridEditor");
};

exports.postedSignUpForm = (req, res) => {
  let formData = req.body
  res.render("thanks",{formData:formData});
};

exports.showAbout = (req, res) => {
  res.render("about");
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

exports.showProfile = (req, res) => {
  res.render("profile");
}

exports.showSchedule = (req, res) =>{
  res.render("pro");
}
