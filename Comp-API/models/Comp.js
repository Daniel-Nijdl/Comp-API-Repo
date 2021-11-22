const mongoose = require("mongoose");

const compSchema = new mongoose.Schema(
  {
    compCase: {
      type: String,
      required: [true, "Must provide a case name"],
      maxLength: 100,
    },
    mobo: {
      type: String,
      required: [true, "Must provide a motherboard name"],
      maxLength: 100,
    },
    cpu: {
      type: String,
      required: [true, "Must provide a cpu name"],
      maxLength: 100,
    },
    gpu: {
      type: String,
      required: [true, "Must provide a graphics card name"],
      maxLength: 50,
    },
    ram: {
      type: String,
      required: [true, "Must provide a ram name"],
    },
    ssd: {
      type: String,
    },
    hdd: {
      type: String,
    },
    powerSupply: {
      type: String,
      required: [true, "Must provide a power supply name"],
    },
    cooling: {
      type: String,
      required: [true, "Must provide name of cooling component"],
    },
    cpuCooling: {
      type: String,
      required: [true, "Must provide name of cpu cooling component"],
    },
    operatingSystem: {
      type: String,
      required: [true, "Must provide an operating system"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      reqired: [true, "Must provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comp", compSchema);
