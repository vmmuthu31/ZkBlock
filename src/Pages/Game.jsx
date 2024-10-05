import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "../Components/GameComponents/Ground.jsx";
import { FPV as Fpv } from "../Components/GameComponents/FPV.jsx";
import { Player } from "../Components/GameComponents/Player.jsx";
import { Cubes } from "../Components/GameComponents/Cubes.jsx";
import { TextureSelector } from "../Components/GameComponents/TextureSelect.jsx";
import { Menu } from "../Components/GameComponents/Menu.jsx";
import { Joystick } from "../Components/GameComponents/Joystick.jsx";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

function Game() {
  const [joystickDirection, setJoystickDirection] = useState({
    forward: 0,
    right: 0,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const toggleFullScreen = () => {
    const docElm = document.documentElement;
    if (!document.fullscreenElement) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    setIsMobile(isMobileDevice());

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleJump = () => {
    const jumpEvent = new Event("jump");
    window.dispatchEvent(jumpEvent);
    console.log("Jump event dispatched");
  };

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Cubes />
          <Player joystickDirection={joystickDirection} />
          <Ground />
        </Physics>
      </Canvas>
      <TextureSelector />
      <Menu />

      {isMobile && (
        <>
          <Joystick onMove={setJoystickDirection} />

          <button
            onClick={handleJump}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              padding: "15px 20px",
              fontSize: "16px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            Jump
          </button>
        </>
      )}
      {!isMobile && (
        <>
          <div className="pointer">+</div>
          <button
            onClick={toggleFullScreen}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={isFullScreen ? faCompress : faExpand}
              size="lg"
            />
          </button>
        </>
      )}
    </>
  );
}

export default Game;
