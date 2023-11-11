const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Turbine = new Schema(
  {
    _id: { type: String },
    status: { type: String },
    location: { type: String },
    capacity: { type: Number },
    installed_date: { type: String },
    datas: { type: Array }, // Mảng chứa các _id của data liên quan
  },
  { timestamps: true }
);
module.exports = mongoose.model("Turbine", Turbine); // link đến collection cources của thèn database với schema là Course
