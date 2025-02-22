const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, maxlength: 500 }, // Limit description size
    duration: { type: Number, min: 0 }, // Ensure duration is positive
    price: { type: Number, min: 0 }, // Ensure price is non-negative
    isAvailable: { type: Boolean, default: true },

    category: {
      type: String,
      enum: [
        "1) Health, Safety & Emergency Services",
        "2) Security and Access",
        "3) Efficiency and Automation",
        "4) Smart Home and Specific Purpose",
        "5) Programs",
      ],
      required: true,
    },

    solutionSet: {
      type: String,
      enum: [
        "Bed Exit Sensors",
        "Smart Appliances",
        "Automated Electric Vehicle (EV) Charging Station",
        "Fall Detection Sensors",
        "Fire Extinguishers & Suppression",
        "Motion Senor",
        "Security Cameras",
        "Smart Doorbell",
        "Smart Rodent Trap",
        "Smoke and Carbon Monoxide Detectors",
      ], // **Truncated for brevity**
      required: true,
    },

    specificCategory: {
      type: String,
      enum: [
        "Smart Appliances - Electric Kettles",
        "Smart Appliances - Smart Air Fryers",
        "Smart Appliances - Smart Air Purifiers",
        "Smart Appliances - Smart Blenders",
        "Smart Appliances - Smart Coffee Makers",
        "Smart Appliances - Smart Cooktops",
      ], // **Truncated for brevity**
      required: true,
    },

    imageUrl: {
      type: String,
      match: /^https?:\/\/.*\.(jpeg|jpg|gif|png|svg)$/, // Ensures image URL is valid
    },
  },
  { timestamps: true }
);

// ✅ Add Indexes for Performance Optimization
serviceSchema.index({ category: 1 });
serviceSchema.index({ solutionSet: 1 });
serviceSchema.index({ specificCategory: 1 });

module.exports = mongoose.model("Service", serviceSchema);
