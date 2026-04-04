const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    items: [orderItemSchema],
}, {
    timestamps: true
});

orderSchema.statics.findAll = function() {
    return this.find().populate('customer_id', 'name').sort({ createdAt: -1 });
};

orderSchema.statics.create = async function(orderData) {
    const order = new this(orderData);
    await order.save();
    return order._id;
};

orderSchema.statics.findByCustomerId = async function(customerId) {
    // In the original MySQL, this was querying the Sales table
    // We'll require Sale model here to maintain that relationship logic if needed
    const Sale = mongoose.model('Sale');
    const sales = await Sale.find({ customer_id: customerId }).sort({ sale_date: -1 });

    return sales.map(sale => ({
        id: sale._id,
        total_amount: sale.price * sale.quantity,
        status: 'Completed',
        order_date: sale.sale_date,
        items: [{
            product_name: sale.product_name,
            quantity: sale.quantity,
            unit_price: sale.price
        }]
    }));
};

orderSchema.statics.getMonthlyRevenue = async function() {
    return this.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                revenue: { $sum: "$total_amount" }
            }
        },
        { $sort: { _id: -1 } },
        { $limit: 12 },
        { $project: { month: "$_id", revenue: 1, _id: 0 } }
    ]);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
