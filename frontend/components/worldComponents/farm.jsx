"use client"

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Cow from './countryComponents/cow';

// Cow component

// Barn component
function Barn({ position }) {
  return (
    <group position={position}>
      {/* Main barn structure */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 2.25, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.8, 1.5, 4]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 0, 1.51]}>
        <boxGeometry args={[1, 1.6, 0.05]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-1.2, 1, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
      <mesh position={[1.2, 1, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
    </group>
  );
}

// Fence component
function Fence({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Posts */}
      {[-2, -1, 0, 1, 2].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
      
      {/* Horizontal rails */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[4.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[4.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

// Tree component
function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.6, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Foliage - multiple spheres for bushy look */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
      <mesh position={[0.3, 2.3, 0.2]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#2d8b2d" />
      </mesh>
      <mesh position={[-0.3, 2.2, -0.2]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#2d8b2d" />
      </mesh>
    </group>
  );
}

// Main farm scene
export default function FarmScene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#87ceeb' }}>
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        shadows
      >
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
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#7cfc00" />
        </mesh>
        
        {/* Farm elements */}
        <Cow position={[2, 0, 0.6]} />
        <Barn position={[-4, 0, -3]} />
        
        {/* Fences */}
        <Fence position={[3, 0, -1]} rotation={[0, 0, 0]} />
        <Fence position={[3, 0, 3]} rotation={[0, 0, 0]} />
        <Fence position={[5.5, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
        
        {/* Trees */}
        <Tree position={[-6, 0, 3]} />
        <Tree position={[5, 0, -4]} />
        <Tree position={[-2, 0, 5]} />
        
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