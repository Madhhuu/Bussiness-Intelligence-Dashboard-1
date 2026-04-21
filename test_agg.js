const mongoose = require('mongoose');
const Sale = require('./backend/src/models/saleModel');
require('dotenv').config({path: './backend/.env'});

mongoose.connect(process.env.MONGO_URI, { family: 4 })
.then(async () => {
    const kpiStats = await Sale.aggregate([
        {
            $match: {
                sale_date: {
                    $gte: new Date('2026-01-01T00:00:00.000Z'),
                    $lte: new Date('2026-12-31T23:59:59.000Z')
                }
            }
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                revenue: { $sum: { $multiply: ["$price", "$quantity"] } }
            }
        }
    ]);
    console.log("kpiStats:", kpiStats);
    
    const count = await Sale.countDocuments();
    console.log("Total Count from Mongoose:", count);
    
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
