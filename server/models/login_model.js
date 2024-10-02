const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// encrypt password before saving
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // encrypt password
        this.password = await bcrypt.hash(this.password, 10);

        return next();
    } catch (error) {
        return next(error);
    }
});

// compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Check if email is already registered or Username is already taken
userSchema.statics.exists = async function(email, username) {
    const user = await this.findOne({email: email, username: username});
    return !!user;
};

module.exports = mongoose.model('User', userSchema);