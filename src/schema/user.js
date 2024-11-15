import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
},
email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    validate: {
        validator: function (emailValue) { // email regex validator mongoose
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
        },
        message: "invalid email format"
    },
},
role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
},
password: {
    type: String,
    required: true,
    minLength: 5
}
}, {timestamps: true}); //every entry will have two extra properties-- created at & updated at


// MODIFY PASSWORD
userSchema.pre('save', function modifyPassword(next){
    // incoming user object
    const user = this; // object with plain password

    const SALT =  bcrypt.genSaltSync(9);

    // hash password

    const hashedPaswword = bcrypt.hashSync(user.password, SALT);
    
    // replace plain password with hash password
    user.password = hashedPaswword;

    next();
} );

const user = mongoose.model('user', userSchema); //creates user collection

export default user;