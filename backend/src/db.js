const mongoose = require("mongoose");

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return console.log("already connected");
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return console.log("use previous connection");
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}

const db = { connect, disconnect };

module.exports = db;
