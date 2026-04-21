const Sale = require('../backend/src/models/saleModel');
const mongoose = require('mongoose');

async function test() {
    console.log("Testing Sale Model transformation...");
    
    // Create a mock document in memory (no DB connection needed for toJSON check)
    const sale = new Sale({
        product_name: "Test Product",
        category: "Electronics",
        quantity: 1,
        price: 100,
        sale_date: new Date()
    });

    const json = sale.toJSON();
    console.log("JSON Output Keys:", Object.keys(json));
    
    if (json.id && json._id) {
        console.log("✅ Success: Both 'id' and '_id' are present.");
        console.log("ID value:", json.id.toString());
    } else {
        console.log("❌ Failure: 'id' or '_id' missing.");
        console.log(json);
    }
}

test().catch(err => console.error(err));
