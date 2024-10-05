const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Updated without deprecated options)
mongoose
  .connect("mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Define the schema and model
const mapSchema = new mongoose.Schema({
  worldId: String,
  playerId: String,
  mapData: Array,
});

const Map = mongoose.model("Map", mapSchema);

// Route to save the map
app.post("/saveMap", async (req, res) => {
  const { worldId, playerId, mapData } = req.body;

  try {
    // Check if a map already exists for this world and player
    let map = await Map.findOne({ worldId, playerId });
    if (map) {
      // If a map already exists, update it
      map.mapData = mapData;
      await map.save();
    } else {
      // If no map exists, create a new one
      map = new Map({ worldId, playerId, mapData });
      await map.save();
    }
    res.status(200).json({ message: "Map saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save map", error });
  }
});

// Route to load the map
app.get("/loadMap/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    // Find the map for the given player ID
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

app.get("/getMaps/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    // Fetch all maps for the given playerId
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

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
