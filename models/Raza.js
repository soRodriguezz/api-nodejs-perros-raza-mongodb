const mongoose = require("mongoose");

const razaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },  
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
        trim: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
   
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Raza", razaSchema);
