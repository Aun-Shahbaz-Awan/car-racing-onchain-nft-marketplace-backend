const mongoose = require("mongoose");

const ListedSchema = new mongoose.Schema(
  {
    owner_address: {
      type: String,
      required: true,
    },
    token_address: {
      type: String,
      required: true,
    },
    token_id: {
      type: Number,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isListed: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listed", ListedSchema);
