const express = require("express");
const CoinModel = require("../models/coin");
const router = express.Router();

// Route to get the current gold coins of a player
router.get("/api/getGoldCoins/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    const playerCoins = await CoinModel.findOne({ playerId });
    if (playerCoins) {
      res.status(200).json({ gold_coins: playerCoins.gold_coins });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving gold coins", error });
  }
});

// Route to get the current diamonds of a player
router.get("/api/getDiamonds/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    const playerCoins = await CoinModel.findOne({ playerId });
    if (playerCoins) {
      res.status(200).json({ diamonds: playerCoins.diamonds });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving diamonds", error });
  }
});

// Route to update the gold coins of a player
router.put("/api/updateGoldCoins/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { gold_coins } = req.body; // Expecting the updated number of gold coins
  try {
    const playerCoins = await CoinModel.findOne({ playerId });
    if (playerCoins) {
      playerCoins.gold_coins = gold_coins;
      await playerCoins.save();
      res.status(200).json({ message: "Gold coins updated successfully", gold_coins: playerCoins.gold_coins });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating gold coins", error });
  }
});

// Route to update the diamonds of a player
router.put("/api/updateDiamonds/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { diamonds } = req.body; // Expecting the updated number of diamonds
  try {
    const playerCoins = await CoinModel.findOne({ playerId });
    if (playerCoins) {
      playerCoins.diamonds = diamonds;
      await playerCoins.save();
      res.status(200).json({ message: "Diamonds updated successfully", diamonds: playerCoins.diamonds });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating diamonds", error });
  }
});
// Route to get or create player's coins
router.get("/api/getOrCreateCoins/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    let playerCoins = await CoinModel.findOne({ playerId });
    if (!playerCoins) {
      // If the player's coin data doesn't exist, create it
      playerCoins = new CoinModel({
        playerId,
        gold_coins: 500, // Default starting coins
        diamonds: 20,    // Default starting diamonds
      });
      await playerCoins.save();
    }
    res.status(200).json(playerCoins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching or creating coins", error });
  }
});

module.exports = router;


module.exports = router;
