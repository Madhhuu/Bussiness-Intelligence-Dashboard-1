const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock_level: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

productSchema.statics.findAll = function() {
    return this.find();
};

productSchema.statics.findById = function(id) {
    return this.findOne({ _id: id });
};

productSchema.statics.create = async function(productData) {
    const product = new this(productData);
    await product.save();
    return product._id;
};

productSchema.statics.updateStock = async function(id, newStock) {
    await this.updateOne({ _id: id }, { stock_level: newStock });
    return true;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
