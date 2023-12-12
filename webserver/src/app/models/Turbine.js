const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Turbine = new Schema(
  {
    _id: { type: String },
    statusNetwork: {
      type: String,
      enum: ["connected", "disconnected"],
    },
    location: {
      address: { type: String },
      coordinates: { type: [Number] },
    },
    power: { type: Number },
    installed_date: { type: String },
    operatingStatus: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
    },
    maintenanceHistory: {
      date: { type: String },
      description: { type: String },
    },
    datas: { type: [Object] }, // Mảng chứa các _id của data liên quan
  },
  { timestamps: true }
);
module.exports = mongoose.model("Turbine", Turbine); // link đến collection cources của thèn database với schema là Course
