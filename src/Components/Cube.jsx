import { useBox } from "@react-three/cannon";
import { useState, useRef } from "react";
import { useStore } from "../hooks/useStore.js";
import * as textures from "../images/textures.js";

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture = textures[texture + "Texture"];
  const longPressTimeout = useRef(null); // To track the long press timer

  // Handle block removal on long press
  const handleLongPress = () => {
    removeCube(id); // Remove the block after long press
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    // Start a timer when touch starts, set to trigger after 500ms
    longPressTimeout.current = setTimeout(() => {
      handleLongPress(); // Call the long press handler if the press lasts long enough
    }, 500);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    // Clear the timer if the touch is released before 500ms
    clearTimeout(longPressTimeout.current);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    // Clear the timer if the user moves their touch before 500ms
    clearTimeout(longPressTimeout.current);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;
    if (clickedFace === 0) {
      addCube(x + 1, y, z);
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z);
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z);
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z);
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1);
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1);
    }
  };

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      // Handle single click/tap for placing blocks
      onClick={handleClick}
      // Handle long press functionality on touch devices
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
