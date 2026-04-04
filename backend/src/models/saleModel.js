const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale_date: {
        type: Date,
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
}, {
    timestamps: true
});

saleSchema.statics.findAll = function() {
    return this.find().sort({ sale_date: -1, createdAt: -1 });
};

saleSchema.statics.findById = function(id) {
    return this.findOne({ _id: id });
};

saleSchema.statics.create = async function(saleData) {
    const sale = new this(saleData);
    await sale.save();
    return sale._id;
};

saleSchema.statics.update = async function(id, saleData) {
    const result = await this.updateOne({ _id: id }, saleData);
    return result.modifiedCount;
};

saleSchema.statics.delete = async function(id) {
    const result = await this.deleteOne({ _id: id });
    return result.deletedCount;
};

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
