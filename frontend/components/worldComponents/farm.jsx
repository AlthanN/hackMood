"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import Cow from "./countryComponents/Cow";
import Fence from "./countryComponents/Fence";
import Tree from "./countryComponents/Tree";
import StatsHUD from "./StatsHUD";

// Audio component to handle sounds
function AmbientSounds() {
  const fireAudioRef = useRef(null);
  const nightAudioRef = useRef(null);

  useEffect(() => {
    // Create and setup fire sound
    const fireAudio = new Audio("/sounds/fire.mp3"); // or .mp3, .wav depending on your file
    fireAudio.loop = true;
    fireAudio.volume = 0.3;
    fireAudioRef.current = fireAudio;

    // Create and setup night sound
    const nightAudio = new Audio("/sounds/night.m4a"); // or .mp3, .wav depending on your file
    nightAudio.loop = true;
    nightAudio.volume = 0.4;
    nightAudioRef.current = nightAudio;

    // Play both sounds
    fireAudio
      .play()
      .catch((err) => console.log("Fire audio autoplay prevented:", err));
    nightAudio
      .play()
      .catch((err) => console.log("Night audio autoplay prevented:", err));

    // Cleanup function
    return () => {
      fireAudio.pause();
      fireAudio.currentTime = 0;
      nightAudio.pause();
      nightAudio.currentTime = 0;
    };
  }, []);

  return null;
}

// Main farm scene
export default function FarmScene() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#87ceeb",
        position: "relative",
      }}
    >
      <StatsHUD />
      <AmbientSounds />
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }} shadows>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Sky */}
        <Sky sunPosition={[100, 20, 100]} />

        {/* Ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#389413" />
        </mesh>

        {/* Farm elements */}
        <Cow position={[0, 0, 0]} scale={0.5} />

        {/* Fences */}
        <Fence />

        {/* Trees */}
        <Tree />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
