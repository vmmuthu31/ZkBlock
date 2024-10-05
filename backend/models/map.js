const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
  worldId: String,
  playerId: String,
  mapData: Array,
});

module.exports = mongoose.model("Map", mapSchema);
