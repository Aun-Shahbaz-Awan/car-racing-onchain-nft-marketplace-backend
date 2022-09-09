const mongoose = require("mongoose");

const ListedSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    token_Id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    isListed: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listed", ListedSchema);
