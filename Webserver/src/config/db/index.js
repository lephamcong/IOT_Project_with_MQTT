const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MQTT");
    console.log("MongoDB Connect Successfully!!!");
  } catch (error) {
    console.log("MongoDB Connect ERROR!!!");
  }
}
module.exports = { connect };
