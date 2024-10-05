const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/Zk-Block")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const mapRoutes = require("./routes/map");

app.use("/", mapRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
