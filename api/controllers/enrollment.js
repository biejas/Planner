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

module.exports.enroll =  async function(req, res) {
    var choices = req.body;

     for (subject in choices){
       for (choice in choices[subject]){
        //  Course.update({group: choices[subject][choice]}, { $push: { participants: user._id } },  done);
         break;
        //await findCourse({group: choices[subject][choice]}, course);

      //  if (courseParticipants.maxparticipants > courseParticipants.participants.length){
      //    courseParticipants.participants.push();//dodac usera
      //    Course.findByIdAndUpdate({_id: courseParticipants._id}, courseParticipants.participants, {new: true}, function (err, docs) { res.json(docs);});
          // break;
       }
     }
    //
    // }
};

// const findCourse = (value, res) => {
//   return Course.findOne(value).exec(function(err, docs){
//       res.json(docs);
//   });
// };
