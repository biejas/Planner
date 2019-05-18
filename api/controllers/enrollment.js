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
    console.log("Przedmiot:" +choices);
  var isEnrolled = false;
     for (subject in choices){
       for (choice in choices[subject]){
         console.log("wybór:" +choice);
         User.findOne({email: email}, function (err, user) {
           var reply = { participants: mongoose.Types.ObjectId(user._id)};
           Course.findById(choices[subject][choice], function(err, doc){
             if (!doc.participants.includes(user._id)){
               if(doc.participants.length==null) {var participantsAmount = 0;}
               else {var participantsAmount = doc.participants.length;}
               //console.log("UCZESTNICY"+participantsAmount);

               if (participantsAmount< doc.maxparticipants) {
                 Course.findByIdAndUpdate(choices[subject][choice], { $push: reply }, {new: true}  , function(err, doc){
                   if (err) {return console.log("Update error: " + err);}
                   else {setIsEnrolled(isEnrolled);}
                  // console.log("PIERWSZY"+isEnrolled);
                  });
              }
            }
         });
       });
       //console.log("DRUGI"+isEnrolled);
       if (isEnrolled) {break;}
     }
  }
  res.status(200).json("Zapisałeś się!");
};

function setIsEnrolled(isEnrolled) {
  isEnrolled=(!isEnrolled);
}
