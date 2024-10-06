const express = require("express");
const MapModel = require("../models/map");
const router = express.Router();
const { verifyCloudProof } = require("@worldcoin/idkit-core/backend");

const app_id = "app_staging_4bd210266b5d7237f97c4a03f1e1faf0";
const action = "zkblock";

router.post("/api/verify", async (req, res) => {
  const { proof, signal } = req.body;

  try {
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    console.log("Verification result:", verifyRes);
    if (verifyRes.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        code: verifyRes.code,
        attribute: verifyRes.attribute,
        detail: verifyRes.detail,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.post("/api/saveMap", async (req, res) => {
  const { worldId, playerId, mapData } = req.body;
  try {
    let existingMap = await MapModel.findOne({ worldId, playerId }); // Use different variable name for existing map
    if (existingMap) {
      existingMap.mapData = mapData;
      await existingMap.save();
    } else {
      const newMap = new MapModel({ worldId, playerId, mapData });
      await newMap.save();
    }
    res.status(200).json({ message: "Map saved successfully" });
  } catch (error) {
    console.error("Error saving map:", error); // Log error for better debugging
    res
      .status(500)
      .json({ message: "Failed to save map", error: error.message });
  }
});

router.get("/api/loadMap/:playerId", async (req, res) => {
  const { playerId } = req.params;
  try {
    const map = await MapModel.findOne({ playerId });
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
    const maps = await MapModel.find({ playerId });
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
