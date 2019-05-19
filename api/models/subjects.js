var mongoose = require( 'mongoose' );

const subjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    }]
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject