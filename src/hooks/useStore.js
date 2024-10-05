import create from "zustand";
import { nanoid } from "nanoid";
import axios from "axios"; // Axios for making API requests

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: [],

  // Function to add a cube
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          texture: state.texture,
          pos: [x, y, z],
        },
      ],
    }));
  },

  // Function to remove a cube
  removeCube: (id) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.id !== id),
    }));
  },

  // Function to set texture
  setTexture: (texture) => {
    set(() => ({ texture }));
  },

  // Function to save the world map to MongoDB
  saveWorld: async (cubes, worldId, playerId) => {
    try {
      await axios.post("http://localhost:5000/saveMap", {
        worldId,
        playerId,
        mapData: cubes,
      });
      console.log("World saved successfully");
    } catch (error) {
      console.error("Error saving world:", error);
    }
  },

  // Function to load the world map from MongoDB
  loadWorld: async (playerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/loadMap/${playerId}`);
      set({ cubes: response.data.mapData });
      console.log("World loaded successfully");
    } catch (error) {
      console.error("Error loading world:", error);
    }
  },

  // Function to reset the world
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
