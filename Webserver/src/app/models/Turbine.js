const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Turbine = new Schema({
  _id: { type: String },
  status: { type: String },
  location: { type: String },
  code: { type: String },
  capacity: { type: Number },
  installed_date: { type: String },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Turbine", Turbine); // link đến collection cources của thèn database với schema là Course
