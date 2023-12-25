const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://49.236.210.65:9002/MQTT");
    console.log("MongoDB Connect Successfully!!!");
  } catch (error) {
    console.log("MongoDB Connect ERROR!!!", error);
  }
}
module.exports = { connect };
