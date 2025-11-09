"use client";

import React, { useRef, useEffect} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Barn from './countryComponents/Barn';
import Chicken from './countryComponents/Chicken';
import Cow from './countryComponents/Cow';
import Fence from './countryComponents/Fence';
import Frog from './countryComponents/Frog';
import Pig from './countryComponents/Pig';
import Soda from './countryComponents/Soda';
import Tree from './countryComponents/Tree';
import Grass from './countryComponents/Grass';
import Trough from './countryComponents/Trough';
import Carrot from './countryComponents/Carrot';
import Hay from './countryComponents/Hay';
import Rocks from './countryComponents/Rocks';
import Silo from './countryComponents/Silo';
import Pond from './countryComponents/Pond';
import Tulip from './countryComponents/Tulip';
import Stairs from './countryComponents/Stairs';
import Stone from './countryComponents/Stone';
import Stone2 from './countryComponents/Stone2';
import Duck from './countryComponents/Duck';
import TopHat from './countryComponents/TopHat';
import StatsHUD from './StatsHUD';

//import Canvas from "@react-three/fiber";

import { extend } from "@react-three/fiber";
extend({ Color: THREE.Color, Fog: THREE.Fog });

function AmbientSounds() {
  const farmAudioRef = useRef(null);

  useEffect(() => {
    // Create and setup fire sound
    const farmAudio = new Audio("/sounds/FarmAudio.mp3");
    farmAudio.loop = true;
    farmAudio.volume = 0.3;
    farmAudioRef.current = farmAudio;

    // Play both sounds
    farmAudio
      .play()
      .catch((err) => console.log("Farm audio autoplay prevented:", err));

    // Cleanup function
    return () => {
      farmAudio.pause();
      farmAudio.currentTime = 0;
    };
  }, []);

  return null;
}

function GradientBackground() {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        side={THREE.BackSide}
        uniforms={{
          topColor: { value: new THREE.Color('#fa7f98') },   // top of sky
          bottomColor: { value: new THREE.Color('#ffe19c') }, // bottom of sky
        }}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y * 0.5 + 0.5;
            gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
          }
        `}
      />
    </mesh>
  )
}

// Main farm scene
export default function FarmScene() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a2a4a' }}>

      
      <Canvas
        camera={{ position: [6, 8, 6], fov: 60 }}
        shadows
      >
        <AmbientSounds />
        
        {/* Lighting */}
        <ambientLight intensity={0.8} color = "#ff8754" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
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
        <Barn 
        position = {[0, 4, -8.2]}
        scale = {6}
        />

        {/* Barn Rocks */}
        <Rocks 
        position = {[-4.5, 0, -5.5]}
        scale = {8}
        rotation = {[0, -1, 0]}
        />
        <Rocks 
        position = {[-1, 0, 12]}
        scale = {3}
        rotation = {[0, -988, 0]}
        />
        <Rocks 
        position = {[5, 0, 7.5]}
        scale = {3}
        rotation = {[0, 84, 0]}
        />
        <Rocks 
        position = {[3, 0, -3]}
        scale = {3}
        rotation = {[0, 32, 0]}
        />
        <Rocks 
        position = {[-14, 0, -11]}
        scale = {5}
        rotation = {[0, 52, 0]}
        />

        {/* Boss Frog */}
        <Frog 
        position = {[0, 8.65, -7.5]}
        scale = {0.015}
        />
        <TopHat 
        position = {[0, 8.86, -7.3]}
        scale = {0.02}
        rotation = {[-0.3, 0, 0]}
        />
        <Soda 
        position = {[0, 8.4, -7.0]}
        scale = {0.03}
        />

        <Silo 
        position = {[-13, 4, 2]}
        scale = {4}
        rotation = {[0, Math.PI/2, 0]}
        />

        {/* Pond Frogs */}
        <Frog 
        position = {[-6, 1.12, 7]}
        scale = {0.015}
        rotation = {[0, -0.5, 0]}
        />
        <Frog 
        position = {[-4.55, 2.3, 13.5]}
        scale = {0.015}
        rotation = {[0, -2, 0]}
        />    
        <Frog 
        position = {[-6.5, 1, 14]}
        scale = {0.015}
        rotation = {[0, 4, 0]}
        />     

        {/* Pond */}
        <Pond 
        position = {[-10, -0, 10]}
        scale = {0.05}
        rotation = {[0, -Math.PI/2, 0]}
        />

        {/* Pond Trees */}
        <Tree 
        position = {[-13.5, 6.5, 14]}
        scale = {5}
        receiveShadow
        />
        <Tree 
        position = {[-11, 3.5, 14]}
        scale = {2.5}
        rotation = {[0, 1.5, 0]}
        receiveShadow
        />
        <Tree 
        position = {[-14.5, 4.5, 7]}
        scale = {3.5}
        rotation = {[0, 1.3, 0]}
        receiveShadow
        />
        
        {/* Stairs */}
        <Stairs 
        position = {[-9.8, 0, 4.5]}
        scale = {5.3}
        rotation = {[0, -Math.PI, 0]}
        />
        <Stairs 
        position = {[-4.5, 0, 9.9]}
        scale = {5.3}
        rotation = {[0, Math.PI/2, 0]}
        />

        {/* Stones */}
        <Stone 
        position = {[-13.5, 0, 4.3]}
        scale = {10}
        rotation = {[0, -Math.PI/2 -0.2, 0]}
        />
        <Stone 
        position = {[-6, 0, 5]}
        scale = {10}
        rotation = {[0, Math.PI/2 , 0]}
        />
        <Stone 
        position = {[-4.3, 0, 13.5]}
        scale = {10.5}
        rotation = {[0, Math.PI, 0]}
        />
        <Stone2 
        position = {[-4.8, 0.3, 6]}
        scale = {11}
        rotation = {[-Math.PI/2, 0, 0]}
        />
        <Stone2 
        position = {[-4.8, 0.3, 13]}
        scale = {8}
        rotation = {[Math.PI/2, 0, 0]}
        />
        {/* Gap Stones */}
        <Stone2 
        position = {[-4.8, 0.3, 13]}
        scale = {8}
        rotation = {[Math.PI/2, 0, 0]}
        />
        <Stone2 
        position = {[-4.8, -0.2, 14.8]}
        scale = {8}
        rotation = {[0, 0, 0]}
        />
        <Stone2 
        position = {[-7, -0.2, 5]}
        scale = {8}
        rotation = {[0, 0, 0]}
        />
        <Stone2 
        position = {[-13, 0.3, 4.2]}
        scale = {11}
        rotation = {[-Math.PI/2, 0, -Math.PI/1.9]}
        />


        {/* Pond Grass */}
        <Grass
        position = {[-5, 0, 2]}
        scale = {4}
        rotation = {[0, -1, 0]}
        />
        <Grass
        position = {[-13, 0, -2]}
        scale = {4}
        rotation = {[0, -2, 0]}
        />
        <Grass
        position = {[0, 0, 13.5]}
        scale = {4}
        rotation = {[0, 0, 0]}
        />
        <Grass
        position = {[1, 0, 5]}
        scale = {4}
        rotation = {[0, -1, 0]}
        />

        {/* Pond Ducks */}
        <Duck
        position = {[-12.5, 0, 9]}
        scale = {0.15}
        rotation = {[0, -0.5, 0]}
        />
        <Duck
        position = {[-11.5, -0.2, 12]}
        scale = {0.15}
        rotation = {[0, 1, 0]}
        />
        {/* Land Ducks */}
        <Duck
        position = {[-3, 0, 7.5]}
        scale = {0.15}
        rotation = {[0, -2, 0]}
        />
        <Duck
        position = {[-1, 0, 5.5]}
        scale = {0.1}
        rotation = {[0, -2.3, 0]}
        />
        <Duck
        position = {[-2, 0, 3.5]}
        scale = {0.1}
        rotation = {[0, -1.6, 0]}
        />

        {/* Tulips */}
        <Tulip
        position = {[-6.5, 0.9, 2.9]}
        scale = {1.5}
        rotation = {[0, -2, 0]}
        />
        <Tulip
        position = {[-5.5, 0.9, -11]}
        scale = {1.5}
        rotation = {[0, 0, 0]}
        />
        <Tulip
        position = {[4.5, 1.3, -3]}
        scale = {2}
        rotation = {[0, 1, 0]}
        />
        <Tulip
        position = {[4.5, 0.6, -4.5]}
        scale = {1}
        rotation = {[0, 0.7, 0]}
        />
        <Tulip
        position = {[-2, 0.9, 14]}
        scale = {1.5}
        rotation = {[0, 0, 0]}
        />
        <Tulip
        position = {[9, 0.9, 13]}
        scale = {1.5}
        rotation = {[0, 0, 0]}
        />

        {/* Tulip Grass */}
        <Grass
        position = {[3, 0, -5]}
        scale = {4}
        rotation = {[0, -1.9, 0]}
        />
        <Grass
        position = {[7, 0, 13]}
        scale = {4}
        rotation = {[0, 2.9, 0]}
        />
        
        
        {/* Back fence */}
        <Fence
        position = {[10, 0, -14]}
        scale = {1.5}
        />

        {/* Left Fence */}
        <Fence
        position = {[14.3, 0, -9.7]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />
        <Fence
        position = {[14.3, 0, -1.1]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />
        <Fence
        position = {[14.3, 0, 7.5]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />

        {/* Right Fence */}
        <Fence
        position = {[5.7, 0, -9.7]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />
        <Fence
        position = {[5.7, 0, -1.1]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />
        <Fence
        position = {[5.7, 0, 7.5]}
        scale = {1.5}
        rotation = {[0, -Math.PI/2, 0]}
        />

        {/* Front fence */}
        <Fence
        position = {[10, 0, 11.8]}
        scale = {1.5}
        />

        {/* Pig Trees */}
        <Tree 
        position = {[13, 7.5, -13]}
        scale = {6}
        rotation = {[0, 1, 0]}
        />
        <Tree 
        position = {[13, 6, 12.5]}
        scale = {5}
        rotation = {[0, 1, 0]}
        />

        {/* Trough */}
        <Trough 
        position = {[9, 0, -12.5]}
        scale = {1.3}
        rotation = {[0, -Math.PI/2, 0]}
        />

        {/* Carrots */}
        <Carrot 
        position = {[13, 0.1, 0]}
        scale = {0.3}
        />
        <Carrot 
        position = {[9, 0.1, 5]}
        scale = {0.3}
        />
        <Carrot 
        position = {[7, 0.1, 3.5]}
        scale = {0.3}
        />
        <Carrot 
        position = {[8, 0.1, 3]}
        scale = {0.3}
        />

        {/* Pigs */}
        <Pig 
        position = {[10, 1, -10]}
        scale = {0.02}
        rotation = {[0, 3.4, 0]}
        />
        <Pig 
        position = {[7.5, 1, -10]}
        scale = {0.02}
        rotation = {[0, -Math.PI, 0]}
        />
        <Pig 
        position = {[9.5, 1, 3]}
        scale = {0.02}
        rotation = {[0, 6, 0]}
        />
        
        {/* Pig Grass */}
        <Grass
        position = {[6.5, 0, 4.5]}
        scale = {4}
        rotation = {[0, -1, 0]}
        />
        <Grass
        position = {[12, 0, 10]}
        scale = {4}
        rotation = {[0, 0, 0]}
        />
        <Grass
        position = {[13, 0, -10]}
        scale = {4}
        rotation = {[0, 2, 0]}
        />
        <Grass
        position = {[10, 0, -2]}
        scale = {4}
        rotation = {[0, -1, 0]}
        />
        <Grass
        position = {[14, 0, 13.4]}
        scale = {3}
        rotation = {[0, 1, 0]}
        />
        <Grass
        position = {[4.5, 0, 9]}
        scale = {3}
        rotation = {[0, 1, 0]}
        />
        
        {/* Pig Rocks */}
        <Rocks 
        position = {[12, 0, -3]}
        scale = {14}
        rotation = {[0, -2, 0]}
        />
        <Rocks 
        position = {[11.5, 0, 14]}
        scale = {5}
        rotation = {[0, 3, 0]}
        />
        

        {/* Hay */}
        <Hay 
        position = {[8, 0, 10]}
        scale = {0.4}
        rotation = {[0, 3.8, 0]}
        />

        {/* Cow */}
        <Cow 
        position = {[11.5, 0, 7.5]}
        scale = {0.5}
        rotation = {[0, -0.9, 0]}
        />
        

        {/* Chicken Trees */}
        <Tree 
        position = {[-13, 7.5, -13]}
        scale = {6}
        receiveShadow
        />
        <Tree 
        position = {[-8.2, 5, -9]}
        scale = {4}
        rotation = {[0, -1, 0]}
        receiveShadow
        />
        <Tree 
        position = {[-13.5, 6, -4.8]}
        scale = {5}
        rotation = {[0, 1.7, 0]}
        receiveShadow
        />

        {/* Chickens */}
        <Chicken 
        position = {[-12, 0, -11]}
        scale = {0.0075}
        rotation = {[0, 3, 0]}
        />
        <Chicken 
        position = {[-8, 0, -12]}
        scale = {0.0075}
        rotation = {[0, 0.5, 0]}
        />
        <Chicken 
        position = {[-10, 0, -13]}
        scale = {0.0075}
        rotation = {[0, 1.4, 0]}
        />
        <Chicken 
        position = {[-13.5, 0, -6]}
        scale = {0.0075}
        rotation = {[0, 3.5, 0]}
        />
        <Chicken 
        position = {[-8, 0, -5]}
        scale = {0.0075}
        rotation = {[0, 4, 0]}
        />
        <Chicken 
        position = {[-6.5, 0, -8]}
        scale = {0.0075}
        rotation = {[0, 1.5, 0]}
        />

        {/* Chicken Grass */}
        <Grass
        position = {[-10, 0, -11]}
        scale = {4}
        />
        <Grass
        position = {[-12, 0, -7]}
        scale = {4}
        rotation = {[0, 2, 0]}
        />
        <Grass
        position = {[-6.7, 0, -6.5]}
        scale = {4}
        rotation = {[0, -0.5, 0]}
        />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle = {Math.PI/2.2}
        />
        <GradientBackground />
      </Canvas>
    </div>
  );
}
