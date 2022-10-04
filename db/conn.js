const { MongoClient } = require("mongodb");
const Db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kcvmcsa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback, connectToMQTT) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("alter");
        console.log("Successfully connected to MongoDB.");
        connectToMQTT();
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
