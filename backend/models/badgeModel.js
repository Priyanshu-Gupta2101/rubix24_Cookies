const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  criteria: {
    type: { type: String, required: true },
    count: { type: Number, required: true },
    category: { type: String, default: "Any" },
  },
  created_at: { type: Date, default: Date.now },
});

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
