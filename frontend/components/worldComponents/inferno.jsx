"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Soda } from "./infernoComponents/soda";
import { Frog } from "./infernoComponents/frog";
import { NeonSigns } from "./infernoComponents/neonSigns";
import { DeadTree } from "./infernoComponents/deadTree";
import { Rocks } from "./infernoComponents/rocks";
import { Rock } from "./infernoComponents/rock";
import { Volcano } from "./infernoComponents/volcano";
import { Speakers } from "./infernoComponents/speakers";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// Lava particles component
function LavaParticles() {
  const particlesRef = useRef();
  const particleCount = 200;

  // Initialize particle positions and velocities
  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const lifetimes = [];

    for (let i = 0; i < particleCount; i++) {
      // Start at volcano top (adjust based on your volcano height)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 10; // Starting height at volcano top
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: Math.random() * 0.5 + 0.3, // Upward velocity
        z: (Math.random() - 0.5) * 0.3,
      });

      lifetimes.push(Math.random() * 100);
    }

    return { positions, velocities, lifetimes };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Apply velocity
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        // Apply gravity
        velocities[i].y -= 0.01;

        // Update lifetime
        lifetimes[i] -= 1;

        // Reset particle when it dies or falls too low
        if (lifetimes[i] <= 0 || positions[i3 + 1] < 0) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 2;

          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = 10;
          positions[i3 + 2] = Math.sin(angle) * radius;

          velocities[i].x = (Math.random() - 0.5) * 0.3;
          velocities[i].y = Math.random() * 0.5 + 0.3;
          velocities[i].z = (Math.random() - 0.5) * 0.3;

          lifetimes[i] = Math.random() * 100;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#ff4400"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Bumpy ground component
function BumpyGround() {
  const groundRef = useRef();

  useMemo(() => {
    if (groundRef.current) {
      const geometry = groundRef.current.geometry;
      const positionAttribute = geometry.attributes.position;

      // Add random height variation to create bumps
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        // Create bumpy terrain using noise-like function
        const distance = Math.sqrt(x * x + y * y);
        const height =
          Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.8 +
          Math.sin(x * 0.3) * Math.cos(y * 0.7) * 0.5 +
          Math.random() * 0.3;

        positionAttribute.setZ(i, height);
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, []);

  return (
    <mesh
      ref={groundRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[60, 60, 100, 100]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

// Main inferno scene
export default function InfernoScene() {
  const lavaAudioRef = useRef();

  // Load and play lava sound
  useEffect(() => {
    lavaAudioRef.current = new Audio("/sounds/lava.wav");
    lavaAudioRef.current.loop = true;
    lavaAudioRef.current.volume = 0.6; // Adjust volume as needed

    const playAudio = async () => {
      try {
        await lavaAudioRef.current.play();
      } catch (error) {
        console.log("Lava audio autoplay blocked. User interaction needed.");
      }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
      if (lavaAudioRef.current) {
        lavaAudioRef.current.pause();
        lavaAudioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#0a0a0a",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 12, 16], fov: 60 }} shadows>
        {/* Red/orange inferno sky */}
        <color attach="background" args={["#2a1515"]} />

        {/* MEGA FOG - very dense and close */}
        <fog attach="fog" args={["#3a2020", 5, 25]} />

        {/* Inferno lighting - hot and intense */}
        <ambientLight intensity={1.5} color="#ff8855" />
        <directionalLight
          position={[20, 25, 20]}
          intensity={3}
          color="#ffcc66"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        {/* Volcanic glow from below */}
        <pointLight
          position={[0, -5, 0]}
          intensity={4}
          distance={50}
          color="#ff5533"
          castShadow
        />

        {/* Secondary glow - orange */}
        <pointLight
          position={[0, -3, 0]}
          intensity={3}
          distance={45}
          color="#ffaa66"
        />

        {/* Lava glow at volcano top */}
        <pointLight
          position={[0, 10, 0]}
          intensity={6}
          distance={25}
          color="#ff3300"
        />

        {/* Bumpy ground */}
        <BumpyGround />

        {/* Lava particles erupting from volcano */}
        <LavaParticles />

        {/* Volcano - centerpiece - EXTREMELY HUGE */}
        <Volcano position={[0, 0, 0]} scale={20} />

        {/* Dead trees scattered around */}
        <DeadTree
          position={[8, 0, 8]}
          scale={0.8}
          rotation={[0, Math.PI / 4, 0]}
        />
        <DeadTree
          position={[-8, 0, 8]}
          scale={0.9}
          rotation={[0, -Math.PI / 3, 0]}
        />
        <DeadTree
          position={[10, 0, -10]}
          scale={0.7}
          rotation={[0, Math.PI / 6, 0]}
        />
        <DeadTree
          position={[-10, 0, -8]}
          scale={1}
          rotation={[0, -Math.PI / 4, 0]}
        />

        {/* Rocks scattered around volcano */}
        <Rocks position={[5, 0, 5]} scale={1.2} />
        <Rocks position={[-6, 0, 6]} scale={0.9} />
        <Rocks position={[7, 0, -7]} scale={1} />
        <Rocks position={[-8, 0, -6]} scale={1.1} />

        {/* Individual rocks for more detail */}
        <Rock position={[3, 0, 3]} scale={0.5} />
        <Rock position={[-5, 0, 4]} scale={0.6} />
        <Rock position={[6, 0, -5]} scale={0.7} />
        <Rock position={[-7, 0, -7]} scale={0.5} />
        <Rock position={[2, 0, -8]} scale={0.8} />

        {/* Soda can next to frog on left speaker */}
        <Soda
          position={[-18, 0, 0.5]}
          scale={0.15}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Neon signs next to speakers */}
        <NeonSigns
          position={[15, 2, -3]}
          scale={0.3}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <NeonSigns
          position={[-15, 2, 3]}
          scale={0.3}
          rotation={[0, Math.PI / 4, 0]}
        />

        {/* Speakers for sound */}
        <Speakers
          position={[15, 0, 0]}
          scale={0.3}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Speakers
          position={[-15, 0, 0]}
          scale={0.3}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Frog on the side of the screen */}
        <Frog position={[25, 0.5, 0]} scale={0.05} />

        {/* Orbit controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
