import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./Components/Ground";
import { FPV as Fpv } from "./components/FPV.jsx";
import { Player } from "./Components/Player.jsx";
import { Cubes } from "./Components/Cubes.jsx";
import { TextureSelector } from "./components/TextureSelect.jsx";
import { Menu } from "./components/Menu.jsx";
import { Joystick } from "./components/Joystick.jsx"; // Use consistent casing here

import { useState } from "react";  // Import useState to manage joystick data

function App() {
  // State to track joystick direction
  const [joystickDirection, setJoystickDirection] = useState({ forward: 0, right: 0 });

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Cubes />
          {/* Pass joystickDirection as a prop to Player */}
          <Player joystickDirection={joystickDirection} />
          <Ground />
        </Physics>
      </Canvas>
      <TextureSelector />
      <Menu />

      {/* Handle joystick movement by updating the state */}
      <Joystick onMove={setJoystickDirection} />

      <div className="pointer">+</div>
    </>
  );
}

export default App;
