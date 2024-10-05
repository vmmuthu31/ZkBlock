const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
  },
  gold_coins: {
    type: Number,
    default: 500,  // Initially 500 gold coins
  },
  diamonds: {
    type: Number,
    default: 20,  // Initially 20 diamonds
  },
});

module.exports = mongoose.model("Coin", coinSchema);
