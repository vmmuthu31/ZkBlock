import { useState, useEffect } from "react";
import { useStore } from "../hooks/useStore.js";

export const Menu = () => {
  const [saveWorld, resetWorld, loadWorld, fetchMaps] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
    state.loadWorld,
    state.fetchMaps,
  ]);
  const cubes = useStore((state) => state.cubes); // Get cubes from the store
  const availableMaps = useStore((state) => state.availableMaps); // Get available maps for dropdown

  const worldId = "world_1"; // Example world ID (can be dynamically set)
  const playerId = "player_123"; // Example player ID

  const [selectedMap, setSelectedMap] = useState("");

  // Fetch all maps for the player when the component mounts
  useEffect(() => {
    fetchMaps(playerId);
  }, [fetchMaps, playerId]);

  // Handle map selection from the dropdown
  const handleMapSelection = (event) => {
    setSelectedMap(event.target.value);
  };

  return (
    <div className="menu absolute">
      <button onClick={() => saveWorld(cubes, worldId, playerId)}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
      
      <select value={selectedMap} onChange={handleMapSelection}>
        <option value="" disabled>Select a map</option>
        {availableMaps.map((map) => (
          <option key={map.worldId} value={map.worldId}>
            {map.worldId}
          </option>
        ))}
      </select>

      <button onClick={() => loadWorld(selectedMap, playerId)} disabled={!selectedMap}>
        Load
      </button>
    </div>
  );
};
