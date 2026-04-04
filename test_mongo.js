const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Native Client");
        const db = client.db("bi_dashboard_test");
        const collection = db.collection("test");
        await collection.insertOne({ test: 1 });
        console.log("Insert successful");
        const doc = await collection.findOne({ test: 1 });
        console.log("Find successful:", doc);
        await collection.deleteOne({ test: 1 });
        console.log("Cleanup successful");
    } catch (e) {
        console.error("Native Client Error:", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
