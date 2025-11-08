"use client"

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { useRef } from 'react';

function Cow({ position }) {
  const cowRef = useRef();
  
  useFrame((state) => {
    // Gentle bobbing animation
    cowRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
  });

  return (
    <group ref={cowRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.8, 1.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Black spots */}
      <mesh position={[-0.3, 0.6, 0.3]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, 0.5, -0.2]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.8, 1.2]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 0.6, 1.7]} castShadow>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      
      {/* Nostrils */}
      <mesh position={[-0.1, 0.6, 1.85]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.6, 1.85]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 0.9, 1.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 0.9, 1.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.35, 1.1, 1.1]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.35, 1.1, 1.1]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Horns */}
      <mesh position={[-0.25, 1.2, 1.2]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      <mesh position={[0.25, 1.2, 1.2]} rotation={[0, 0, 0.3]} castShadow>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.4, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.4, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.4, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.4, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Hooves */}
      <mesh position={[-0.4, -0.5, 0.5]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, -0.5, 0.5]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.4, -0.5, -0.5]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, -0.5, -0.5]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.6, -1]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.2, -1.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default Cow;
