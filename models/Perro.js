const mongoose = require("mongoose");

const perroSchema = new mongoose.Schema(
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
    nacimiento: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    dueno: {
        type: String,
        required: true,
    },
    raza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Raza",
        required: true,
    }
   
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Perro", perroSchema);
