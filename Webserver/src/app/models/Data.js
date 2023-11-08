const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Data = new Schema(
  {
    _id: { type: String },
    temperature: { type: Number },
    pressure: { type: Number },
    wind_speed: { type: Number },
    power_output: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Data", Data); // link đến collection cources của thèn database với schema là Course
