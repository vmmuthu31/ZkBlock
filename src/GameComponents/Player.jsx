import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard.js";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

export const Player = ({ joystickDirection }) => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump: jumpKeyPressed } = useKeyboard();
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 1, 0],
    }));

    const pos = useRef([0, 0, 0]);
    const vel = useRef([0, 0, 0]);

    const [isJumping, setIsJumping] = useState(false); // To track if jump button is pressed

    useEffect(() => {
        api.position.subscribe((p) => {
            pos.current = p;
        });
    }, [api.position]);

    useEffect(() => {
        api.velocity.subscribe((v) => {
            vel.current = v;
        });
    }, [api.velocity]);

    // Handle the "jump" event for mobile
    useEffect(() => {
        const jumpHandler = () => {
            setIsJumping(true); // Set jump flag when button is pressed
        };

        window.addEventListener("jump", jumpHandler);

        return () => {
            window.removeEventListener("jump", jumpHandler);
        };
    }, []);

    useFrame(() => {
        // Update camera position to follow the player
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

        const direction = new Vector3();

        // Fixing forward/backward movement
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0) - joystickDirection.forward
        );

        // Fixing left/right movement
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0) - joystickDirection.right,
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(CHARACTER_SPEED)
            .applyEuler(camera.rotation);

        // Apply velocity to the player's physics body for movement
        api.velocity.set(direction.x, vel.current[1], direction.z);

        // Check for jump (keyboard or button press)
        const canJump = Math.abs(vel.current[1]) < 0.05;

        // If either the keyboard jump or button jump is triggered
        if ((jumpKeyPressed || isJumping) && canJump) {
            api.applyImpulse([0, CHARACTER_JUMP_FORCE, 0], [0, 0, 0]);
            console.log('Jump impulse applied'); // Debugging to ensure the impulse is applied
            setIsJumping(false); // Reset the jump button flag
        }
    });

    return <mesh ref={ref} />;
};
