const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide item description"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["for sale", "saled", "not for sale"],
      default: "not for sale",
    },
    price: {
      type: Number,
      required: [true, "Please provide item price"],
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
