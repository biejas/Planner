var mongoose = require( 'mongoose' );

const subjectSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        unique: true,
        recquired: true
    },
    name: {
        type: String
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId
    }]
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject