const mongoose = require('mongoose');

class Database {
  constructor() {
    if (!Database.instance) {
      this._connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  _connect() {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error:', err);
      });
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;