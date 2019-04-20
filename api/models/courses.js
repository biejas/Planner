var mongoose = require( 'mongoose' );

const courseschema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        unique: true,
        required: true
    },
    subject: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Subject',
        required: true
    },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teacher'
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