var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');

module.exports.profileRead = async function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
  var subjectcourse=[];
  await User
      .findById(req.payload._id)
      .exec(async function(err, user) {
        await Subject.find({}, async function (err, subjects){
          for (sub of subjects) {
            let cou=await Course.findOne({_id: sub.courses, participants: req.payload._id}, async function (err, course){
              return course;
              });
              if(cou==null){
                cou = {
                  group : "Brak",
                  teacher: "Brak",
                  coursetype: "Brak"
                }
              }
              subjectcourse.push({course: cou, subjectname: sub.name});
            }
              res.status(200).json({user: user, course: subjectcourse});

          });
      });
  }
};
