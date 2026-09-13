const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://root:shubhserver@127.0.0.1:27017/?authSource=admin";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const db = client.db("local_server");
    const collections = await db.listCollections().toArray();
    
    console.log(`\nFound ${collections.length} collections:`);
    
    for (const col of collections) {
      console.log(`\n--- Collection: ${col.name} ---`);
      const collection = db.collection(col.name);
      const count = await collection.countDocuments();
      console.log(`Total documents: ${count}`);
      
      const sample = await collection.findOne();
      if (sample) {
        console.log("Sample Document Structure:");
        console.log(JSON.stringify(sample, null, 2));
      }
    }
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
