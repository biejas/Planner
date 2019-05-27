var mongoose = require( 'mongoose' );

const courseschema = new mongoose.Schema({
    coursetype: {
        type: String
    },
    group: {
        type: String
    },
    teacher: {
        type: String
    },
    maxparticipants: {
        type: Number,
        required: true
    },
    participants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }]
});

const Course = mongoose.model('Course', courseschema);

module.exports = Course
