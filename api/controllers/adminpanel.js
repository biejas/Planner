var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var Subject = mongoose.model('Subject');
var Teacher = mongoose.model('Teacher');

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