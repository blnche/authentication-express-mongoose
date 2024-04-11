const { MongoClient } = require('mongodb');
const Db = process.env['ATLAS_URI'];
const client = new MongoClient(Db);

var _db;

module.exports = {
    connectToServer: async () => {
        try {
            await client.connect();

            _db = client.db('Cluster0');
            console.log('Successfully connected to MongoDB'); //not showing
        } catch (err) {
            console.log('Connection failed :'+ error);
        }
    },
   
    getDb: () => {
        return _db;
    },
};