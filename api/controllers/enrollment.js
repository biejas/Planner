var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');
var Teacher = mongoose.model('Teacher');

var studentsEnrollment = [];
var readyStudentsEnrollment = {};
var smiesznaZmienna = 0;
var maxparticipants = 20;

module.exports.courses = function(req, res){

    var query = Subject.find().populate('courses');
    query.exec(function(err, docs){
        res.json(docs);
    });
};

module.exports.enroll = function(req, res){
        studentsEnrollment.push(req.body);
        smiesznaZmienna++;
        res.status(200).json("Zapisałeś się!");
      if(smiesznaZmienna>1) {
        prepareArrays();
        finishEnrollment();
      }

};

function finishEnrollment(){
      startEnrolling();
      sendEnrollmentsToDatabase();
      studentsEnrollment.length = 0;
      smiesznaZmienna = 0;
}

function startEnrolling(){
    var choiceSize = Object.keys(studentsEnrollment[0]).length -1;
    for(var j=0; j< choiceSize; j++){
      for(var i=0; i< studentsEnrollment.length; i++){
        // getMaxParticipants(studentsEnrollment[i][j].group, function(err,course) {
        //   if( err ) {
        //   } else {
        //     //console.log(course.maxparticipants);
        //   }
        // });

        let gro = findGroup(i,j);
        if(gro.participants.length< maxparticipants){
          let sign=checkIfSigned(studentsEnrollment[i].useremail, studentsEnrollment[i][j].subject);
          if(!sign){
            gro.participants.push(studentsEnrollment[i].useremail);
          }
        }
      }
      shuffle(studentsEnrollment);
    }
}

function sendEnrollmentsToDatabase(){

  //console.log(readyStudentsEnrollment);
  for (var sub in readyStudentsEnrollment) {
   // console.log(readyStudentsEnrollment[sub]);
    for (course of readyStudentsEnrollment[sub]) {
      var listOfUserId= [];
      var reply = [];
      User.find({'email': { $in: course.participants}}, function(err, docs){
          for (user of docs) {
            listOfUserId.push(user._id);
          }
          reply={participants: {$each: listOfUserId}};
          Course.findByIdAndUpdate(course.id, { $addToSet: reply }, {new: true}  , function(err, doc){
            if (err) {return console.log("Update error: " + err);}
            else {console.log("KOLEJNA PETLA");}
          });

      });

    }
  }
}





function checkIfSigned(useremail, subject){
  for (group of readyStudentsEnrollment[subject]) {
    if(group.participants.includes(useremail)){
      return true;
    }
  }
  return false;
}


function findGroup(i,j){
  return readyStudentsEnrollment[studentsEnrollment[i][j].subject].find(x => x.id === studentsEnrollment[i][j].group);
}


// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function prepareArrays(){
  var choiceSize = Object.keys(studentsEnrollment[0]).length -1;
  for(var i=0; i< choiceSize; i++){
  readyStudentsEnrollment[studentsEnrollment[0][i].subject]= [];
  }
  for(var i=0; i< choiceSize; i++){
    readyStudentsEnrollment[studentsEnrollment[0][i].subject].push({id: studentsEnrollment[0][i].group, participants: []});
  }
}









function getMaxParticipants(courseId, callback){
  Course.findById(courseId, function(err, item){
    if(!err) {
      callback(null,item);
    } else {
      callback("error");
    }
  });
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
