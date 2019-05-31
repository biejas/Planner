var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');

module.exports.adminRead = function(req, res){

}

module.exports.addSubject = function(req, res){
    var ids = [];
    var newSub = req.body;
    for (var course of newSub.groups){
        let newCourse = new Course(course);
        console.log(newCourse);
        newCourse.save(function(err, obj){
            if (err) {
                console.log(err);
                return;
            }
        });
        ids.push(newCourse._id);
    }
    console.log("done");
    console.log(ids);

    var newSubject = new Subject({name : newSub.name, courses : ids});
    newSubject.save(function(err,obj){
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports.deleteElement = function(req, res){
    Subject.findOneAndRemove({_id : req.body._id },function(err, obj){
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports.deleteCourse = function(req, res){
    Course.findOneAndRemove({_id : req.body._id },function(err, obj){
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports.getEnrollmentResult= async function(req,res){
  var subjectcourse=[];
  await Subject.find({}, async function (err, subjects){
    for (sub of subjects) {
        let cou=await Course.find({_id: sub.courses}, function (err, course){
              return course;
            }).populate('participants');
              for(c of cou){
                var participantsList=[];
                for(student of c.participants){
                  participantsList.push(student.name);
                }
                subjectcourse.push({subjectname: sub.name, group: c.group, participants: participantsList});
              }
            }
            res.status(200).json(subjectcourse);
          });
}
