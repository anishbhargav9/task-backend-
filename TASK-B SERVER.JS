TASK-B CODE
 SERVER.JSCODE:


const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://anishbhargav9challa:td48b8g7AyY9M5FS@cluster0.ebflp5j.mongodb.net/tradingDB?retryWrites=true&w=majority';

// Sample data to be inserted into the database
const data = [
  {
    "chainId": "injective",
    "dexId": "dojoswap",
    "url": "https://dexscreener.com/injective/inj17ufy5gqw33t0prwhkwa6ensv0jpj3xfvylgx8j",
    "pairAddress": "inj17ufy5gqw33t0prwhkwa6ensv0jpj3xfvylgx8j",
    "baseToken": {
      "address": "inj19dtllzcquads0hu3ykda9m58llupksqwekkfnw",
      "name": "Baby DOJO Token",
      "symbol": "babyDOJO"
    },
    "quoteToken": {
      "address": "inj1zdj9kqnknztl2xclm5ssv25yre09f8908d4923",
      "name": "Dojo Token",
      "symbol": "DOJO"
    },
    "priceNative": "0.006623",
    "priceUsd": "0.004145",
    "volume": {
      "h24": 284651.74,
      "h6": 86598.28,
      "h1": 21370.52,
      "m5": 4.78
    }
  },
  {
    "chainId": "injective",
    "dexId": "dojoswap",
    "url": "https://dexscreener.com/injective/inj19ucgk3rghfwu9an5vdl3kxf02h8cguk50042ff",
    "pairAddress": "inj19ucgk3rghfwu9an5vdl3kxf02h8cguk50042ff",
    "baseToken": {
      "address": "inj19dtllzcquads0hu3ykda9m58llupksqwekkfnw",
      "name": "Baby DOJO Token",
      "symbol": "babyDOJO"
    },
    "quoteToken": {
      "address": "inj",
      "name": "Injective",
      "symbol": "INJ"
    },
    "priceNative": "0.0001300",
    "priceUsd": "0.004829",
    "volume": {
      "h24": 1024.48,
      "h6": 238.99,
      "h1": 48.03,
      "m5": 0
    }
  }
];

// Create a new MongoClient instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("Attempting to connect to MongoDB...");

// Connect to the MongoDB server
client.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  try {
    console.log("MongoDB connection successful");

    const database = client.db('tradingDB');

    // Insert data into "price" collection
    const priceCollection = database.collection('price');
    const priceInsertResult = await priceCollection.insertMany(data.map(item => ({ priceNative: item.priceNative })));
    console.log('Data inserted into "price" collection successfully:', priceInsertResult.insertedCount);

    // Insert data into "volume" collection
    const volumeCollection = database.collection('volume');
    const volumeInsertResult = await volumeCollection.insertMany(data.map(item => ({ volume: item.volume })));
    console.log('Data inserted into "volume" collection successfully:', volumeInsertResult.insertedCount);

    // CRUD operations for "price" collection

    // Read all prices
    const allPrices = await priceCollection.find({}).toArray();
    console.log('All prices:', allPrices);

    // Read a specific price
    const specificPrice = await priceCollection.findOne({ priceNative: '0.006623' });
    console.log('Specific price:', specificPrice);

    // Update a price
    const updatePrice = await priceCollection.updateOne(
      { priceNative: '0.006623' },
      { $set: { priceUsd: '0.005' } }
    );
    console.log('Price updated:', updatePrice.modifiedCount);

    // Delete a price
    const deletePrice = await priceCollection.deleteOne({ priceNative: '0.006623' });
    console.log('Price deleted:', deletePrice.deletedCount);

    // CRUD operations for "volume" collection

    // Read all volumes
    const allVolumes = await volumeCollection.find({}).toArray();
    console.log('All volumes:', allVolumes);

    // Read a specific volume
    const specificVolume = await volumeCollection.findOne({ "volume.h24": 1024.48 });
    console.log('Specific volume:', specificVolume);

    // Update a volume
    const updateVolume = await volumeCollection.updateOne(
      { "volume.h24": 1024.48 },
      { $set: { "volume.h24": 1200 } }
    );
    console.log('Volume updated:', updateVolume.modifiedCount);

    // Delete a volume
    const deleteVolume = await volumeCollection.deleteOne({ "volume.h24": 1024.48 });
    console.log('Volume deleted:', deleteVolume.deletedCount);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("MongoDB connection closed");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
