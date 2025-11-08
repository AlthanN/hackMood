"use client"

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Cow from './countryComponents/Cow';
import Fence from './countryComponents/Fence';
import Tree from './countryComponents/Tree';
//import Canvas from "@react-three/fiber";

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
        <Cow />
        
        {/* Fences */}
        <Fence  />
        
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