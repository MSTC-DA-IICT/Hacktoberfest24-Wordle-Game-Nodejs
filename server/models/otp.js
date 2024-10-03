const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // This will make the document expire after 10 minutes
    }
});

otpSchema.statics.exists = async function(email, otp) {
    const otpDoc = await this.findOne({email: email, otp: otp});
    return !!otpDoc;
}

module.exports = mongoose.model('Otp', otpSchema);