"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Soda } from './infernoComponents/soda';
import { Frog } from './infernoComponents/frog';
import { NeonSigns } from './infernoComponents/neonSigns';
import { DeadTree } from './infernoComponents/deadTree';
import { Rocks } from './infernoComponents/rocks';
import { Rock } from './infernoComponents/rock';
import { Volcano } from './infernoComponents/volcano';
import { Speakers } from './infernoComponents/speakers';
import StatsHUD from './StatsHUD';

// Main inferno scene
export default function InfernoScene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0a0a', position: 'relative' }}>
      <StatsHUD />
      <Canvas
        camera={{ position: [15, 10, 15], fov: 60 }}
        shadows
      >
        {/* Red/orange inferno sky */}
        <color attach="background" args={['#2a1515']} />
        <fog attach="fog" args={['#3a2020', 10, 60]} />

        {/* Inferno lighting - hot and intense */}
        <ambientLight intensity={1.2} color="#ff8855" />
        <directionalLight
          position={[20, 25, 20]}
          intensity={2.5}
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
          intensity={3}
          distance={50}
          color="#ff5533"
          castShadow
        />

        {/* Secondary glow - orange */}
        <pointLight
          position={[0, -3, 0]}
          intensity={2.5}
          distance={45}
          color="#ffaa66"
        />

        {/* Ground - dark volcanic ash */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Volcano - centerpiece - EXTREMELY HUGE */}
        <Volcano position={[0, 0, 0]} scale={20} />

        {/* Dead trees scattered around */}
        <DeadTree position={[8, 0, 8]} scale={0.8} rotation={[0, Math.PI / 4, 0]} />
        <DeadTree position={[-8, 0, 8]} scale={0.9} rotation={[0, -Math.PI / 3, 0]} />
        <DeadTree position={[10, 0, -10]} scale={0.7} rotation={[0, Math.PI / 6, 0]} />
        <DeadTree position={[-10, 0, -8]} scale={1} rotation={[0, -Math.PI / 4, 0]} />

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
        <Soda position={[-15.5, 2.5, 0.5]} scale={0.15} rotation={[0, Math.PI / 2, 0]} />

        {/* Neon signs next to speakers */}
        <NeonSigns position={[15, 2, -3]} scale={0.3} rotation={[0, -Math.PI / 4, 0]} />
        <NeonSigns position={[-15, 2, 3]} scale={0.3} rotation={[0, Math.PI / 4, 0]} />

        {/* Speakers for sound */}
        <Speakers position={[15, 1, 0]} scale={0.3} rotation={[0, -Math.PI / 2, 0]} />
        <Speakers position={[-15, 1, 0]} scale={0.3} rotation={[0, Math.PI / 2, 0]} />

        {/* Frog on the side of the screen */}
        <Frog position={[25, 0.5, 0]} scale={0.05} />

        {/* Orbit controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI/2.2}
        />
      </Canvas>
    </div>
  );
}
