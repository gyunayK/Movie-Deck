const { MongoClient, ObjectId } = require('mongodb');
const URL = process.env.MONGO_URL, dbName = process.env.MONGO_DB_NAME;


const mongoConnect = async () => {
    const dbObject = await MongoClient.connect(URL);

    console.log(`Connected to ${dbName} database`);
    return await dbObject.db(dbName)
}

module.exports = { mongoConnect, ObjectId };

