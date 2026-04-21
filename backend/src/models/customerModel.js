const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

customerSchema.statics.findAll = function() {
    return this.find().sort({ createdAt: -1 });
};

customerSchema.statics.findById = function(id) {
    return this.findOne({ _id: id });
};

customerSchema.statics.create = async function(customerData) {
    const customer = new this(customerData);
    await customer.save();
    return customer._id;
};

customerSchema.statics.update = async function(id, customerData) {
    const result = await this.updateOne({ _id: id }, customerData);
    return result.modifiedCount;
};

customerSchema.statics.delete = async function(id) {
    const result = await this.deleteOne({ _id: id });
    return result.deletedCount;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
