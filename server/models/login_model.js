const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



userSchema.pre('save' , async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    console.log(password,this.password);
    
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;




