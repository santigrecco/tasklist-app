const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.MONGODB_DATABASE;

class DBClient {
  constructor() {
    this.db = null;
    this.client = null;
  }

  async connect(done) {
    if (this.db) return done();

    await MongoClient.connect(URI, (err, client) => {
      if (err) return done(err);
      this.db = client.db(DATABASE_NAME);
      this.client = client;
      done();
    });
  }

  getDatabase(dbName) {}

  close() {
    if (this.db) {
      this.db.close((err, result) => {
        this.db = null;
        this.db.mode = null;
        done(err);
      });
    }
  }
}

exports.DBClient = new DBClient();
