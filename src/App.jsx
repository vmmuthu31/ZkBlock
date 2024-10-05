import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./Components/Ground";
import { FPV as Fpv } from "./Components/FPV.jsx";
import { Player } from "./Components/Player.jsx";
import { Cubes } from "./Components/Cubes.jsx";
import { TextureSelector } from "./Components/TextureSelect.jsx";
import { Menu } from "./Components/Menu.jsx";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <TextureSelector />
      <Menu />
      <div class="pointer">+</div>
    </>
  );
}

export default App;
