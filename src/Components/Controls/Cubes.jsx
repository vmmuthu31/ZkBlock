import { useStore } from "../../hooks/useStore";
import { Cube } from "./Cube.jsx";

export const Cubes = () => {
  const cubes = useStore((state) => state.cubes); // Fetch cubes from Zustand

  return cubes.map(({ id, pos, texture }) => (
    <Cube key={id} id={id} position={pos} texture={texture} />
  ));
};
