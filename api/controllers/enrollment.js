var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');
var Teacher = mongoose.model('Teacher');

var studentsEnrollment = [];

//var smiesznaZmienna = 0;

module.exports.courses = function(req, res){

    var query = Subject.find().populate('courses');
    query.exec(function(err, docs){
        res.json(docs);
    });
};

module.exports.enroll = function(req, res){
        studentsEnrollment.push(req.body);
//        smiesznaZmienna++;
        res.status(200).json("Zapisałeś się!");
//      if(smiesznaZmienna>1) {
//        finishEnrollment();
//      }

};

function finishEnrollment(){
      var result = startEnrolling();
      studentsEnrollment.length = 0;
//      smiesznaZmienna = 0;
}

function startEnrolling(){
  //  console.log(studentsEnrollment);
    var choiceSize = Object.keys(studentsEnrollment[0]).length -1;
    for(var j=0; j< choiceSize; j++){
      for(var i=0; i< studentsEnrollment.length; i++){

    //    console.log(studentsEnrollment[i][j]);
    //    console.log(studentsEnrollment[i]['useremail']);
      }
    }

    //shuffle(studentsEnrollment);

}

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// module.exports.enroll = function(req, res) {
//   var email= req.body.useremail;
//   delete req.body.useremail;
//   var choices = req.body;
//     console.log("Przedmiot:" +choices);
//   var isEnrolled = false;
//      for (subject in choices){
//        for (choice in choices[subject]){
//          console.log("wybór:" +choice);
//          User.findOne({email: email}, function (err, user) {
//            var reply = { participants: mongoose.Types.ObjectId(user._id)};
//            Course.findById(choices[subject][choice], function(err, doc){
//              if (!doc.participants.includes(user._id)){
//                if(doc.participants.length==null) {var participantsAmount = 0;}
//                else {var participantsAmount = doc.participants.length;}
//                if (participantsAmount< doc.maxparticipants) {
//                  Course.findByIdAndUpdate(choices[subject][choice], { $push: reply }, {new: true}  , function(err, doc){
//                    if (err) {return console.log("Update error: " + err);}
//                    else {setIsEnrolled(isEnrolled);}
//                   });
//               }
//             }
//          });
//        });
//        if (isEnrolled) {break;}
//      }
//   }
//   res.status(200).json("Zapisałeś się!");
// };
//
// function setIsEnrolled(isEnrolled) {
//   isEnrolled=(!isEnrolled);
// }
