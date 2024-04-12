const { MongoClient } = require('mongodb');
const Db = process.env['ATLAS_URI'];
const client = new MongoClient(Db);

var _db;

module.exports = {
    connectToServer: async () => {
        try {
            await client.connect();

            _db = client.db('test');
            console.log('Successfully connected to MongoDB');
        } catch (err) {
            console.log('Connection failed :'+ err);
        }
    },
   
    getDb: () => {
        return _db;
    },
};