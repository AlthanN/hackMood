"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { Boulder } from './happyComponents/Boulder';
import StatsHUD from './StatsHUD';
import { Boulder2 } from './happyComponents/Boulder2';
import { Seagull } from './happyComponents/Seagull';
import { BBQ } from './happyComponents/BBQ';
import {PTree} from './happyComponents/PTree';
import { Sailboat } from './happyComponents/SailBoat';
import { TreeFrog } from './happyComponents/TreeFrog';
import { LifePreserve } from './happyComponents/LifePreserve';
import { SandCastle } from './happyComponents/SandCastle';
import { DuckPool } from './happyComponents/DuckPool';
import { OrangeChair } from './happyComponents/OrangeChair';
import { Table } from './happyComponents/Table';
import { Cocktail } from './happyComponents/Cocktail';


// Animated Water Component
function Water() {
  const meshRef = useRef();
  
  // Create wave geometry with more vertices for smooth animation
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 50, 128, 128);
    return geo;
  }, []);
  
  // Animate waves with natural back-and-forth motion
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;
    
    for (let i = positions.count-1; i >= 0; i--) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Main wave that oscillates back and forth (tide in/out effect)
      // Using cosine for smooth transition between advancing and retreating
      const tideSpeed = 0.4;
      const tideAmount = Math.cos(time * tideSpeed) * 2; // Oscillates between -2 and 2
      
      // Wave height based on position and tide
      const waveFrequency = 0.2;
      const waveHeight = Math.sin((y + tideAmount) * waveFrequency) * 0.25;
      
      // Add rolling wave crests that move with the tide
      const rollingWave = Math.sin((y + tideAmount) * 0.3 - time * 1.5) * 0.15;
      
      // Lateral variation for natural look
      const lateralVariation = Math.sin(x * 0.3 + time * 0.5) * 0.08;
      
      // Foam/splash effect that appears during wave motion
      const foamIntensity = Math.abs(Math.sin(time * tideSpeed)); // 0 to 1
      const foamEffect = Math.sin(x * 0.8 + time * 3) * 0.06 * foamIntensity;
      
      // Small ripples for detail
      const ripples = Math.sin(x * 0.5 + y * 0.5 + time * 2) * 0.03;
      
      // Combine all effects
      const finalHeight = waveHeight + rollingWave + lateralVariation + foamEffect + ripples;
      
      positions.setZ(i, finalHeight);
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -15]}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={geometry}
    >
      <meshStandardMaterial
        color="#1e90ff"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Sandy Beach
function Beach() {
  const beachRef = useRef();
  
  // Create textured sand appearance
  const sandTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base sand color
    ctx.fillStyle = '#f4e4c1';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add sand grain texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 2;
      const shade = Math.floor(Math.random() * 30);
      
      ctx.fillStyle = `rgb(${224 + shade}, ${204 + shade}, ${161 + shade})`;
      ctx.fillRect(x, y, size, size);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    
    return texture;
  }, []);
  
  return (
    <mesh
      ref={beachRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.3, 25]}
      receiveShadow
    >
      <planeGeometry args={[100, 30, 32, 32]} />
      <meshStandardMaterial
        map={sandTexture}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// Palm Tree
function PalmTree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 4, 8]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} />
      </mesh>
      
      {/* Trunk segments (texture) */}
      {[0.5, 1.5, 2.5, 3.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.3, 0.05, 8, 12]} />
          <meshStandardMaterial color="#6b5638" />
        </mesh>
      ))}
      
      {/* Palm leaves */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.1;
        const z = Math.sin(angle) * 0.1;
        
        return (
          <group key={i} position={[0, 4, 0]} rotation={[0, angle, 0]}>
            <mesh
              position={[0.5, 0.2, 0]}
              rotation={[0, 0, -0.3]}
              castShadow
            >
              <boxGeometry args={[2, 0.05, 0.4]} />
              <meshStandardMaterial color="#228b22" roughness={0.7} />
            </mesh>
          </group>
        );
      })}
      
      {/* Coconuts */}
      <mesh position={[0.2, 3.7, 0.2]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[-0.15, 3.8, 0.1]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

// Beach Ball
function BeachBall({ position }) {
  const ballRef = useRef();
  
  useFrame((state) => {
    ballRef.current.rotation.x += 0.005;
    ballRef.current.rotation.z += 0.003;
  });
  
  return (
    <mesh ref={ballRef} position={position} castShadow>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial
        color="#ff6b6b"
        roughness={0.3}
        metalness={0.1}
      />
      {/* Stripes */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.41, 16, 16, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[0.41, 16, 16, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffe66d" />
      </mesh>
    </mesh>
  );
}


// Rocks
function Rock({ position, scale }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#808080" roughness={0.9} />
    </mesh>
  );
}

// Main Beach Scene
export default function BeachScene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <StatsHUD />
      <Canvas
        camera={{ position: [10, 8, 15], fov: 60 }}
        shadows
      >
        {/* Sky */}
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.6}
          azimuth={0.25}
        />
        
        
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[20, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <hemisphereLight
          skyColor="#87ceeb"
          groundColor="#f4e4c1"
          intensity={0.5}
        />
        
        {/* Water */}
        <Water />
        
        {/* Beach */}
        <Beach />
        
        {/* Palm Trees */}
        <PTree position={[0, 0, 25]} scale={5} />
        <PTree position={[12, 0, 24]} scale={5}/>
        <PTree position={[-45, 0, 20]} scale={5}/>
        <PTree position={[-20, 0, 25]} scale={5} />
        <PTree position={[30, 0, 24]} scale={5}/>
        <PTree position={[-30, 0, 30]} scale={5}/>
        
        <SandCastle position={[-30, 0, 20]} scale={0.2}></SandCastle>

        {/* Beach Ball */}
        <BeachBall position={[4, 0.4, 6]} />
        <BeachBall position={[0, 0.4, 3]} />
        <BeachBall position={[10, 0.4, -5]} />


    
        <DuckPool position={[-25, 0, -15]} scale={1} ></DuckPool>
        <DuckPool position={[30, 0, -10]} scale={1} ></DuckPool>

        <PTree position={[-40, 0, 30]} scale={5}></PTree>
        {/* Rocks */}
        <Rock position={[-5, 0.2, 25]} scale={[0.3, 0.3, 0.3]} />
        <Rock position={[6, 0.3, 24]} scale={[0.2, 0.2, 0.2]} />
        <Rock position={[-2, 0.25, 25]} scale={[0.35, 0.35, 0.35]} />
        <Rock position={[7, 0.2, 25]} scale={[0.25, 0.25, 0.25]} />

        <Boulder position={[45,8,30]} scale={20}></Boulder>
        <Boulder2 position={[15,0,40]} rotation={[0,10,0]} scale={50}></Boulder2>
        <Boulder2 position={[-15,0,40]} rotation={[0,15,0]} scale={50}></Boulder2>

        {/* Animals */}
        <Seagull position={[25, 0.2, 25]} rotation={[0,20,0]} scale={0.05}></Seagull>
        <Seagull position={[30, 0.2, 35]} rotation={[0,40,0]} scale={0.05}></Seagull>
        <Seagull position={[25, 0.2, 30]} rotation={[0,60,0]} scale={0.05}></Seagull>


        <BBQ position={[-40, 2  , 20]} rotation={[0, 2, 0]}scale={5}></BBQ>
        <Sailboat position={[-30, -7, -30]} rotation={[0, 1.5, 0]} scale={1}></Sailboat>
        <TreeFrog position={[-20, 3.5, -28]} rotation={[0, 1.5, 0]} scale={0.05}></TreeFrog>
        <Sailboat position={[21, -10.5, -25]} rotation={[0, 2, 0]} scale={1.5}></Sailboat>
        <TreeFrog position={[32, 5, -28]} rotation={[0, 2, 0]} scale={0.1}></TreeFrog>

        <LifePreserve position={[10,0,-5]} scale={0.01  } ></LifePreserve>
        <LifePreserve position={[-10,0,0]} scale={0.01  } ></LifePreserve>

        <OrangeChair position={[5,1,20]} scale={40}></OrangeChair>
        <OrangeChair position={[-5,1,22]} rotation={[0, 5, 0]} scale={40}></OrangeChair>
        <OrangeChair position={[-21,1,22]} rotation={[0, 0 , 0]} scale={40}></OrangeChair>
        <OrangeChair position={[-15,1,20]} rotation={[0, 5 , 0]} scale={40}></OrangeChair>
        <OrangeChair position={[21,1,22]} rotation={[0, 5.5 , 0]} scale={40}></OrangeChair>
        <OrangeChair position={[27,1,20]} rotation={[0, 5 , 0]} scale={40}></OrangeChair>
        <Table position={[-1, 1, 20]} scale={2}></Table>
        <Table position={[23, 1, 19]} scale={2}></Table>
        <Table position={[-18, 1, 20]} scale={2}></Table>
        <Cocktail position={[-0.5,2,20]} scale={2}></Cocktail>
        <Cocktail position={[-1.6,2,20]} scale={2}></Cocktail>
        <Cocktail position={[-17.4,2,20]} scale={2}></Cocktail>
        <Cocktail position={[-18.3,2,20]} scale={2}></Cocktail>
        <Cocktail position={[23.5,2,19]} scale={2}></Cocktail>

        <TreeFrog position={[3, 2.35, 20]} rotation={[0, 4, 0]} scale={0.05}></TreeFrog>
        <TreeFrog position={[-15.5, 2.35, 18]} rotation={[0, 4, 0]} scale={0.05}></TreeFrog>
        <TreeFrog position={[-22, 2.35, 22]} rotation={[0, 2.5, 0]} scale={0.05}></TreeFrog>
        <TreeFrog position={[-5, 2.35, 20]} rotation={[0, 3, 0]} scale={0.05}></TreeFrog>








        
        
        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 5]}
        />
      </Canvas>
      
      {/* Info overlay */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '75px',
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        background: 'rgba(0,0,0,0.3)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        🏖️ Beach Scene • Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}