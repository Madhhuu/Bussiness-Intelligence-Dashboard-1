const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Analyst'],
        default: 'Analyst',
    },
}, {
    timestamps: true
});

// Middleware to rename _id to id or handle it uniformly if needed.
// But for now, we will add static methods for backward compatibility.

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

userSchema.statics.findById = function(id) {
    return this.findOne({ _id: id });
};

userSchema.statics.create = async function(userData) {
    const user = new this(userData);
    await user.save();
    return user._id;
};

userSchema.statics.update = async function(id, userData) {
    await this.updateOne({ _id: id }, userData);
    return true;
};

userSchema.statics.updatePassword = async function(id, hashedPassword) {
    await this.updateOne({ _id: id }, { password_hash: hashedPassword });
    return true;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
