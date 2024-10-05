import { useStore } from "../hooks/useStore.js";

export const Menu = () => {
  const [saveWorld, resetWorld, loadWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
    state.loadWorld,
  ]);
  const cubes = useStore((state) => state.cubes); // Get cubes from the store

  const worldId = "world_1"; // Example world ID
  const playerId = "player_123"; // Example player ID

  return (
    <div className="menu absolute">
      <button onClick={() => saveWorld(cubes, worldId, playerId)}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
      <button onClick={() => loadWorld(playerId)}>Load</button> {/* Load button */}
    </div>
  );
};
