const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace <db_username> and <db_password> with your actual credentials
const uri = "mongodb+srv://maxd4637:4P6Lim0XwxWHp0Rm@active8.anycn.mongodb.net/family_tree?retryWrites=true&w=majority&appName=Active8";

// Create a MongoClient with Stable API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,  // Using Stable API version
    strict: true,                  // Enables strict mode
    deprecationErrors: true,        // Warns on deprecated features
  }
});

async function run() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();

    // Send a ping to ensure the connection is successful
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Close the client connection when done
    await client.close();
  }
}

// Run the connection function
run().catch(console.dir);
