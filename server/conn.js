const { MongoClient } = require("mongodb");

// use the local MongoDB Compass as opposed to altas used by the tutorial
const uri = process.env.URI;
const client = new MongoClient(uri);

var _db;

module.exports = {
  connectToServer: async function (callback) {

    try {
      await client.connect();
      console.log("Successfully connected to the MongoDB!");
    } catch (e) {
      console.error(e);
    }

    // get the Users Schema
    _db = client.db("DailyBugle");

    return (_db === undefined ? false : true);
  },

  getDb: function () {
    return _db;
  },
};