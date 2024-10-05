import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Import Three.js for quaternion manipulation

// Utility function to check if the user is on a mobile device
const isMobileDevice = () => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

export function FPV() {
  const { camera, gl } = useThree();
  const touchStart = useRef({ x: 0, y: 0 });
  const isTouching = useRef(false);
  const rotationX = useRef(0); // Track camera's X rotation manually
  const rotationY = useRef(0); // Track camera's Y rotation manually (no clamping)

  // Sensitivity for touch controls
  const sensitivity = 0.002;

  // Check if the user is on mobile or desktop
  const isMobile = isMobileDevice();

  // Touch controls for mobile
  useEffect(() => {
    if (!isMobile) return; // Only add touch controls on mobile devices

    const handleTouchStart = (event) => {
      isTouching.current = true;
      // Capture the starting position of the touch
      touchStart.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchMove = (event) => {
      if (!isTouching.current) return;

      // Calculate how far the touch moved
      const touch = event.touches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      // Horizontal rotation (Y-axis) - Continuous rotation, no clamping
      rotationY.current -= deltaX * sensitivity;

      // Vertical rotation (X-axis) - Rotate up and down (clamped)
      rotationX.current -= deltaY * sensitivity;
      rotationX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationX.current)); // Clamp between -60 and 60 degrees

      // Apply the rotation using quaternion to avoid issues with Euler angles
      const quaternion = new THREE.Quaternion();
      quaternion.setFromEuler(new THREE.Euler(rotationX.current, rotationY.current, 0, "YXZ"));
      camera.quaternion.copy(quaternion);

      // Update touch start to the new position for continuous dragging
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
    };

    // Attach event listeners to handle touch events on mobile
    gl.domElement.addEventListener("touchstart", handleTouchStart);
    gl.domElement.addEventListener("touchmove", handleTouchMove);
    gl.domElement.addEventListener("touchend", handleTouchEnd);

    // Clean up the event listeners when the component unmounts
    return () => {
      gl.domElement.removeEventListener("touchstart", handleTouchStart);
      gl.domElement.removeEventListener("touchmove", handleTouchMove);
      gl.domElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera, gl.domElement, isMobile]);

  // Only enable PointerLockControls for desktop (not mobile)
  if (!isMobile) {
    return <PointerLockControls args={[camera, gl.domElement]} />;
  }

  return null; // On mobile, don't render PointerLockControls
}
