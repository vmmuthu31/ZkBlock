import { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Link } from "react-router-dom";
import { UpdateGameData } from "../../Integration.js";

// Utility function to detect if the user is on a mobile device
const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1 ||
    window.innerWidth <= 768
  );
};

export const Menu = () => {
  const [saveWorld, resetWorld, loadWorld, fetchMaps] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
    state.loadWorld,
    state.fetchMaps,
  ]);
  const cubes = useStore((state) => state.cubes);
  const availableMaps = useStore((state) => state.availableMaps);

  const worldId = Math.floor(Math.random() * 10).toString(); // Example world ID
  const playerId = localStorage.getItem("address"); // Example player ID

  const [selectedMap, setSelectedMap] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen state
  const isMobile = isMobileDevice();

  useEffect(() => {
    fetchMaps(playerId);
  }, [fetchMaps, playerId]);

  const handleMapSelection = (event) => {
    setSelectedMap(event.target.value);
  };

  // Handle the full-screen toggle functionality
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle map loading and show a toast notification
  const handleLoadWorld = async () => {
    try {
      await loadWorld(selectedMap, playerId);
      toast.success("Map loaded successfully!", {
        position: "top-right",
        autoClose: 3000, // Automatically close after 3 seconds
      });
    } catch (error) {
      toast.error("Failed to load map.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsMenuVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.body.style.cursor = "default";
    } else {
      if (!isMobile) document.body.style.cursor = "none";
    }
  }, [isMenuVisible, isMobile]);

  const handleDropdownFocus = () => {
    document.body.style.cursor = "default";
  };

  return (
    <div>
      {/* Toast notification container */}
      <ToastContainer />

      {/* Buttons for full-screen and menu in top-right corner */}
      <div className="top-right-buttons">
        <button onClick={toggleFullScreen} className="fullscreen-button">
          <FontAwesomeIcon
            icon={isFullScreen ? faCompress : faExpand}
            size="lg"
          />{" "}
          {/* Full-screen icon */}
        </button>
        <button onClick={toggleMenu} className="menu-button">
          <FontAwesomeIcon icon={faBars} size="lg" /> {/* Mobile menu icon */}
        </button>
      </div>

      {isMenuVisible && (
        <div className="menu-popup">
          <div className="menu-header">
            <h2>Game Menu</h2>
            <button className="close-menu" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faTimes} /> {/* X mark */}
            </button>
          </div>
          <div className="menu-content">
            <button
              onClick={() => {
                saveWorld(cubes, worldId, playerId);
                UpdateGameData(
                  playerId,
                  12,
                  24,
                  worldId,
                  playerId,
                  "MenuProgress"
                );
              }}
            >
              Save
            </button>
            <button onClick={() => resetWorld()}>Reset</button>
            <hr className="hr"></hr>

            <select
              value={selectedMap}
              onChange={handleMapSelection}
              onFocus={handleDropdownFocus}
            >
              <option value="" disabled>
                Select a map
              </option>
              {availableMaps.map((map) => (
                <option key={map.worldId} value={map.worldId}>
                  {map.worldId}
                </option>
              ))}
            </select>

            <button onClick={handleLoadWorld} disabled={!selectedMap}>
              Load
            </button>
          </div>
          <hr className="hr"></hr>
          <a href="/lobby">
            <button>Exit</button>
          </a>
        </div>
      )}
    </div>
  );
};
