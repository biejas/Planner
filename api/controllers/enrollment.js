var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');
mongoose.Promise = global.Promise;

var studentsEnrollment = [];
var readyStudentsEnrollment = {};
var maxcourse=[];


module.exports.courses = function(req, res){
    var query = Subject.find().populate('courses');
    query.exec(function(err, docs){
        res.json(docs);
    });
};

module.exports.enroll = function(req, res){
        studentsEnrollment.push(req.body);
        res.json("Wysłano!");
};

module.exports.startEnrollment = async function(req, res){
    try{
        while (studentsEnrollment.length) {
        studentsEnrollment.pop();
      }
      while (maxcourse.length) {
        maxcourse.pop();
      }
      for (var sub in readyStudentsEnrollment) {
        delete sub;
      }
      await getMaxParticipants();
      await Course.updateMany({}, { $set: {participants: []} }, {new: true});
      res.json("Rozpoczęto zapisy!");
    } catch(err){
      console.log("Nie udało się wyczyścić bazy"+err);
      res.json("Nie udało się!");
    }
}

module.exports.finishEnrollment= function(req, res){
      prepareArrays();
      startEnrolling();
      sendEnrollmentsToDatabase();
      res.json("Zapisy skończone!");
}

function startEnrolling(){
    var choiceSize = Object.keys(studentsEnrollment[0]).length-1;
    for(var j=0; j< choiceSize; j++){
      for(var i=0; i< studentsEnrollment.length; i++){
        let gro = findGroup(i,j);
        let maxparticipants = findMaxParticipants(i,j);
        if(gro.participants.length< maxparticipants.max){
          let sign=checkIfSigned(studentsEnrollment[i].useremail, studentsEnrollment[i][j].subject);
          if(!sign){
            gro.participants.push(studentsEnrollment[i].useremail);
          }
        }
      }
      shuffle(studentsEnrollment);
    }
}

async function sendEnrollmentsToDatabase(){
  for (var sub in readyStudentsEnrollment) {
    for (course of readyStudentsEnrollment[sub]) {
      var listOfUserId= [];
      var reply = [];
      try{
      await User.find({'email': { $in: course.participants}}, async function(err, docs){
          for (user of docs) {
            listOfUserId.push(user._id);
          }
          reply={participants: {$each: listOfUserId}};
          try{
            let updatedCourse = await Course.findByIdAndUpdate(course.id, { $addToSet: reply }, {new: true});
            if (!updatedCourse) { console.log('Not Found Error ');  }
        } catch (err) {
              console.log('Error course');
            }
    });} catch(err) {
      console.log('Error user');
      }
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
  var choiceSize = Object.keys(studentsEnrollment[0]).length-1;
  for(var i=0; i< choiceSize; i++){
    readyStudentsEnrollment[studentsEnrollment[0][i].subject]= [];
  }
  for(var i=0; i< choiceSize; i++){
    readyStudentsEnrollment[studentsEnrollment[0][i].subject].push({id: studentsEnrollment[0][i].group, participants: []});
  }
}

async function getMaxParticipants(){
  let maxarr = await Course.find({});
  for (max of maxarr) {
    maxcourse.push({id: max._id , max: max.maxparticipants});
  }
}

function findMaxParticipants(i, j){
  return maxcourse.find(x => String(x.id) === studentsEnrollment[i][j].group);
}
