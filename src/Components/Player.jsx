import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard.js";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

export const Player = ({ joystickDirection }) => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard();
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 1, 0],
    }));

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => {
            pos.current = p;
        });
    }, [api.position]);

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((p) => {
            vel.current = p;
        });
    }, [api.velocity]);

    useFrame(() => {
        // Update camera position to follow the player
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

        const direction = new Vector3();

        // Fixing forward/backward movement
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0) - joystickDirection.forward // Inverted for correct forward/backward movement
        );

        // Fixing left/right movement
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0) - joystickDirection.right, // Inverted to correct left/right movement
            0,
            0
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(CHARACTER_SPEED)
            .applyEuler(camera.rotation);

        // Apply velocity to the player's physics body
        api.velocity.set(direction.x, vel.current[1], direction.z);

        // Jump if the jump key is pressed and the player is near the ground
        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2]);
        }
    });

    return <mesh ref={ref} />;
};
