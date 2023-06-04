const { MongoClient, ObjectId } = require('mongodb');
const URL = process.env.MONGO_URL, dbName = process.env.MONGO_DB_NAME;


const mongoConnect = async () => {
    const dbObject = await MongoClient.connect(URL);


    // Check id db exists
    // here i am superseeded the database with some data 
    // but i dont have to do it here i can do it in the controller

    
    // const dbList = await dbObject.db().admin().listDatabases();
    // const dbExists = dbList.databases.find(db => db.name === dbName);
    // if (!dbExists) {
    //     // seed the database
    //     const blogs = [
    //         { title: "Blog 1", content: "Content 1", author: "H.S Andersen", comments: [
    //             {
    //                 content: "Comment 1",
    //             }
    //         ]},
    //     ]
    //     await dbObject.db(dbName).collection("blogs").insertMany(blogs);
    // }


    console.log(`Connected to ${dbName} database`);
    return await dbObject.db(dbName)
}

module.exports = { mongoConnect, ObjectId };

