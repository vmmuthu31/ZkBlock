import { useEffect, useRef } from "react";
import nipplejs from "nipplejs";

export const Joystick = ({ onMove }) => {
    const joystickRef = useRef(null);

    useEffect(() => {
        const options = {
            zone: joystickRef.current,
            mode: "static",
            position: { left: "50px", bottom: "50px" }, // Place the joystick on the bottom-left
            color: "blue",
            size: 100,
        };

        const manager = nipplejs.create(options);

        manager.on("move", (event, data) => {
            const { angle, distance } = data;
            if (angle && distance) {
                const direction = {
                    forward: angle.degree > 45 && angle.degree < 135 ? 1 : angle.degree > 225 && angle.degree < 315 ? -1 : 0,
                    right: angle.degree < 45 || angle.degree > 315 ? 1 : angle.degree > 135 && angle.degree < 225 ? -1 : 0,
                };
                onMove(direction);
            }
        });

        manager.on("end", () => {
            onMove({ forward: 0, right: 0 }); // Stop movement when joystick is released
        });

        return () => {
            manager.destroy();
        };
    }, [onMove]);

    return <div ref={joystickRef} style={{ width: "150px", height: "150px", position: "absolute", bottom: 0, left: 0 }} />;
};
