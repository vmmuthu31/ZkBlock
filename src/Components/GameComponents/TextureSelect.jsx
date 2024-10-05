import * as images from "../../images/images.js";
import { useStore } from "../../hooks/useStore.js";
import { useKeyboard } from "../../hooks/useKeyboard.js";
import { useEffect, useState } from "react";

// Utility function to detect if the user is on a mobile device
const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(true); // By default, visible on mobile devices
  const [texture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);

  const { dirt, grass, glass, wood, log } = useKeyboard();

  const isMobile = isMobileDevice(); // Check if the user is on a mobile device

  useEffect(() => {
    if (!isMobile) {
      const visibilityTimeout = setTimeout(() => {
        setVisible(false);
      }, 1000);

      setVisible(true);

      return () => clearTimeout(visibilityTimeout);
    }
  }, [texture, isMobile]);

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    const selectedTexture = Object.entries(options).find(
      ([texture, isEnabled]) => isEnabled
    );

    if (selectedTexture) {
      const [textureName] = selectedTexture;
      setTexture(textureName);
    }
  }, [dirt, grass, glass, wood, log]);

  const handleTextureSelection = (textureName) => {
    setTexture(textureName);
  };

  return (
    <div className={`texture-selector ${visible || isMobile ? "" : "hidden"}`}>
      {Object.entries(images).map(([imgKey, img]) => {
        const textureName = imgKey.replace("Img", "");

        return (
          <img
            className={texture === textureName ? "selected" : ""}
            key={imgKey}
            src={img}
            alt={imgKey}
            onClick={() => handleTextureSelection(textureName)} // Handle selection for desktop
            onTouchStart={() => handleTextureSelection(textureName)} // Handle selection for mobile
          />
        );
      })}
    </div>
  );
};
