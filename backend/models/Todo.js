const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    checked: {
      type: Boolean,
      default: false
    },
    expires: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Todo", todoSchema);
