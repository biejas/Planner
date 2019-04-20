var mongoose = require( 'mongoose' );

const teacherSchema = new mongoose.Schema({
    _id: {
        type:  mongoose.SchemaTypes.ObjectId,
        unique: true,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher