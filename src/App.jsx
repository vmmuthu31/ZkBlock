import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./Components/Ground";
import { FPV as Fpv } from "./Components/FPV.jsx";
import { Player } from "./Components/Player.jsx";
import { Cubes } from "./Components/Cubes.jsx";
import { TextureSelector } from "./Components/TextureSelect.jsx";
import { Menu } from "./Components/Menu.jsx";
import { Joystick } from "./Components/Joystick.jsx";
import { useState, useEffect } from "react";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

// Utility function to detect if the user is on a mobile device
const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

function App() {
  // State to track joystick direction
  const [joystickDirection, setJoystickDirection] = useState({
    forward: 0,
    right: 0,
  });

  // State to manage full-screen status
  const [isFullScreen, setIsFullScreen] = useState(false);

  // State to detect if the device is mobile or desktop
  const [isMobile, setIsMobile] = useState(false);

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    const docElm = document.documentElement;
    if (!document.fullscreenElement) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        // Firefox
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        // IE/Edge
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Use effect to listen for changes in fullscreen status
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    // Detect if the device is mobile or desktop
    setIsMobile(isMobileDevice());

    // Listen to the fullscreenchange event
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Jump button handler
  const handleJump = () => {
    const jumpEvent = new Event("jump");
    window.dispatchEvent(jumpEvent); // Dispatch a custom jump event
    console.log("Jump event dispatched"); // Debug to see if the event fires
  };

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

      {/* Show joystick and mobile controls only if the device is mobile */}
      {isMobile && (
        <>
          {/* Handle joystick movement by updating the state */}
          <Joystick onMove={setJoystickDirection} />

          {/* Jump Button for mobile */}
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

      {/* Show desktop-specific controls only if the device is not mobile */}
      {!isMobile && (
        <>
          <div className="pointer">+</div>

          {/* Button to toggle fullscreen */}
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

export default App;
