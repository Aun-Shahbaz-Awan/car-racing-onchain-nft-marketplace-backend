const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    tokenId: {
      type: Number,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    damage: {
      type: Number,
      default: 0,
    },
    throttle: {
      type: Number,
      default: 0,
    },
    earn: {
      type: Number,
      default: 0,
    },
    nitro: {
      type: Number,
      default: 0,
    },
    tire: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attribute", AttributeSchema);
