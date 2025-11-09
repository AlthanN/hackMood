import { PointerLockControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FirstPersonControls() {
  const { camera } = useThree();
  const moveSpeed = 5;
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Track key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          keys.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          keys.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.current.right = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Move camera based on key presses
  useFrame((state, delta) => {
    const velocity = new THREE.Vector3();

    if (keys.current.forward) velocity.z -= moveSpeed * delta;
    if (keys.current.backward) velocity.z += moveSpeed * delta;
    if (keys.current.left) velocity.x -= moveSpeed * delta;
    if (keys.current.right) velocity.x += moveSpeed * delta;

    // Apply movement relative to camera direction
    velocity.applyEuler(camera.rotation);
    camera.position.add(velocity);
  });

  return <PointerLockControls selector={null} />;
}

export default FirstPersonControls;
