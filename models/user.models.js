const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "required user email"],
      unique: [true, "this email already use"],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["buyer", "store_manager", "admin"],
      default: "buyer",
    },
    verified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
