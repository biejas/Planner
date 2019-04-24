var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');
var Teacher = mongoose.model('Teacher');

module.exports.courses = function(req, res){

    var query = Subject.find().populate('courses');
    query.exec(function(err, docs){
        res.json(docs);
    });
};

module.exports.enroll = function(req, res) {
  var email= req.body.useremail;
  delete req.body.useremail;
  var choices = req.body;
     for (subject in choices){
       for (choice in choices[subject]){
         User.findOne({email: email}, function (err, user) {
           var reply = { participants: mongoose.Types.ObjectId(user._id)};
           Course.findById(choices[subject][choice], function(err, doc){
             Course.findByIdAndUpdate(choices[subject][choice], { $push: reply }, {returnNewDocument: true}  , function(err, doc){
               if (err) return console.log("Update error: " + err);
              });
         });
    });
     break;
   }
  }
  res.status(200).json("Zapisałeś się!");
};
