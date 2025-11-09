import { Tree } from "./campComponents/tree";
import { Campfire } from "./campComponents/campfire";
import { Grass } from "./campComponents/grass";
import { Well } from "./campComponents/well";
import { Cabin } from "./campComponents/cabin";
import { Pond } from "./campComponents/pond";
import { Rock } from "./campComponents/rock";
import { Picnic } from "./campComponents/picnic";
import { Lantern } from "./campComponents/lantern";
import { Stump } from "./campComponents/stump";
import { Marshmallow } from "./campComponents/marshmallow";
import { Truck } from "./campComponents/truck";
import { BBQ } from "./campComponents/bbq";

import * as THREE from "three";
import { extend } from "@react-three/fiber";
extend({ Color: THREE.Color, Fog: THREE.Fog });

function Camp() {
  // Generate tree positions
  const treePositions = [];
  for (let i = 0; i < 100; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 19;
      z = (Math.random() - 0.5) * 19;
    } while (Math.abs(x) < 6 && Math.abs(z) < 6);

    treePositions.push({
      x,
      z,
      scale: 0.8 + Math.random() * 0.6,
      rotation: Math.random() * Math.PI * 2,
    });
  }

  // Generate grass patches
  const grassPositions = [];
  for (let i = 0; i < 150; i++) {
    grassPositions.push({
      x: (Math.random() - 0.5) * 18,
      z: (Math.random() - 0.5) * 18,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * Math.PI * 2,
    });
  }

  // Generate stars
  const starPositions = [];
  for (let i = 0; i < 200; i++) {
    starPositions.push({
      x: (Math.random() - 0.5) * 100,
      y: Math.random() * 50 + 20,
      z: (Math.random() - 0.5) * 100,
      size: Math.random() * 0.3 + 0.1,
    });
  }

  return (
    <>
      {/* Brighter dark blue night sky */}
      <color attach="background" args={["#1a2a4a"]} />

      {/* Lighter fog for atmosphere */}
      <fog attach="fog" args={["#1a2a4a", 15, 40]} />

      {/* Stars */}
      {starPositions.map((star, index) => (
        <mesh key={`star-${index}`} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#3a5a3a" />
      </mesh>

      {/* Scene objects */}
      <Cabin position={[0, -1, 0]} scale={7} />
      <Campfire position={[2, -1, 2]} scale={0.1} />
      <Picnic
        position={[-1, -1, 2]}
        rotation={[0, Math.PI / 4, 0]}
        scale={0.3}
      />
      <Pond position={[3, -0.95, -1]} scale={3} />
      <Well position={[0, 0, 0]} scale={9} />

      <Rock position={[2, -1, 3]} scale={4} />
      <Rock position={[-2, -1, 2]} scale={2} />
      <Rock position={[2, -1, -3]} scale={2} />
      <Rock position={[-8, -1, -7]} scale={9} />
      <Rock position={[9, -1, -5]} scale={0.8} />
      <BBQ position={[-2, -0.7, 3]} rotation={[0, Math.PI, 0]} scale={0.8} />
      <Truck position={[-3, -1, -1]} rotation={[0, Math.PI, 0]} scale={0.4} />
      <Marshmallow position={[2, -1, 2.4]} scale={0.3} />
      <Marshmallow position={[1.5, -1, 2.4]} scale={0.3} />
      <Lantern position={[-1.2, -0.07, 0.5]} scale={0.5} />
      <Stump position={[-2, -0.85, -3]} scale={3} />
      <Stump position={[1, -0.85, 3]} scale={3} />

      {/* Trees */}
      {treePositions.map((pos, index) => (
        <Tree
          key={`tree-${index}`}
          position={[pos.x, 0, pos.z]}
          scale={pos.scale}
          rotation={[0, pos.rotation, 0]}
        />
      ))}

      {/* Grass */}
      {grassPositions.map((pos, index) => (
        <Grass
          key={`grass-${index}`}
          position={[pos.x, -1, pos.z]}
          scale={pos.scale}
          rotation={[0, pos.rotation, 0]}
        />
      ))}

      {/* Brighter ambient moonlight */}
      <ambientLight intensity={0.5} color="#6688ff" />

      {/* Stronger moon light from above */}
      <directionalLight
        position={[5, 20, 5]}
        intensity={1.2}
        color="#aabbff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Campfire glow - point light at campfire position */}
      <pointLight
        position={[2, -0.5, 2]}
        intensity={3}
        distance={10}
        color="#ff6b35"
        castShadow
      />

      {/* Additional warm glow for campfire */}
      <pointLight
        position={[2, 0, 2]}
        intensity={2}
        distance={6}
        color="#ffaa44"
      />

      <pointLight
        position={[-1.2, -0.1, 0.6]}
        intensity={2}
        distance={6}
        color="#ffaa44"
      />
    </>
  );
}

export default Camp;
