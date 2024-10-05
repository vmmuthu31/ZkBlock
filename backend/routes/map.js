const express = require("express");
const map = require("../models/map");
const router = express.Router();

router.post("/api/saveMap", async (req, res) => {
  const { worldId, playerId, mapData } = req.body;
  try {
    let map = await map.findOne({ worldId, playerId });
    if (map) {
      map.mapData = mapData;
      await map.save();
    } else {
      map = new Map({ worldId, playerId, mapData });
      await map.save();
    }
    res.status(200).json({ message: "Map saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save map", error });
  }
});

router.get("/api/loadMap/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    const map = await Map.findOne({ playerId });
    if (map) {
      res.status(200).json({ mapData: map.mapData });
    } else {
      res.status(404).json({ message: "Map not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to load map", error });
  }
});

router.get("/api/getMaps/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    const maps = await Map.find({ playerId });
    if (maps.length > 0) {
      const mapList = maps.map((map) => ({
        worldId: map.worldId,
        playerId: map.playerId,
      }));
      res.status(200).json({ mapList });
    } else {
      res.status(404).json({ message: "No maps found for this player" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve maps", error });
  }
});

module.exports = router;
