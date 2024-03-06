const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    full_name: {
      type: String,
      require: true,
    },
    gender: {
      type: Boolean,
      require: true,
    },
    score: {
      type: Number,
    },
    admission_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("students", StudentSchema);
