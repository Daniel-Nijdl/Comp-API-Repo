const mongoose = require("mongoose");

const compSchema = new mongoose.Schema(
  {
    compCase: {
      type: String,
      required: [true, "Must provide a case name"],
      maxLength: 50,
    },
    mobo: {
      type: String,
      required: [true, "Must provide a motherboard name"],
      maxLength: 50,
    },
    cpu: {
      type: String,
      required: [true, "Must provide a cpu name"],
      maxLength: 50,
    },
    gpu: {
      type: String,
      required: [true, "Must provide a graphics card name"],
      maxLength: 50,
    },
    ram: {
      type: String,
      required: [true, "Must provide a ram name"],
      maxLength: 50,
    },
    ssd: {
      type: String,
      maxLength: 50,
    },
    hdd: {
      type: String,
      maxLength: 50,
    },
    powerSupply: {
      type: String,
      required: [true, "Must provide a power supply name"],
      maxLength: 50,
    },
    cooling: {
      type: String,
      required: [true, "Must provide name of cooling component"],
      maxLength: 50,
    },
    operatingSystem: {
      type: String,
      required: [true, "Must provide an operating system"],
      maxLength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comp", compSchema);
