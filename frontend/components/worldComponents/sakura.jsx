import { Rose } from "./sakuraComponents/rose";
import { BlueRose } from "./sakuraComponents/bluerose";
import { Bench } from "./sakuraComponents/bench";
import { Grass } from "./sakuraComponents/grass";
import { SakuraTree } from "./sakuraComponents/sakuraTree";
import Frog from './countryComponents/Frog';
import { useRef, useEffect } from "react";
import StatsHUD from './StatsHUD';


export default function Sakura() {
  const audioRef = useRef();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/sounds/piano.mp3");
    audioRef.current.loop = true; // Loop the music
    audioRef.current.volume = 0.5; // Set volume to 50%

    // Attempt to autoplay
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log("Autoplay blocked. User interaction needed.");
      }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.4} color="#ffb3d9" />

      {/* Fog for romantic atmosphere */}
      <fog attach="fog" args={["#ffd4e5", 10, 50]} />

      {/* Ground */}
      <Grass />
      <Frog 
        position = {[-5.55, 3.4, 5.55]}
        scale = {0.003}
        rotation = {[0, -Math.PI, 0]}
        />
      <Frog 
        position = {[-5.75, 3.45, 5.5]}
        scale = {0.003}
        rotation = {[0, -Math.PI/0.8, 0]}
        />

      {/* Bench in the center */}
      <group position={[0, 0, 0]}>
        <Bench />

        {/* Red rose on the left side of bench */}
        <group position={[100, -25, 0]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        {/* Red rose on the left side of bench */}
        <group position={[100, -25, 100]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        {/* Red rose on the left side of bench */}
        <group position={[-100, -25, -100]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        <group position={[-100, -25, 100]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        <group position={[30, -25, 100]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        {/* Red rose on the left side of bench */}
        <group position={[-100, -25, -100]} rotation={[0, 0, 0.2]}>
          <Rose scale={0.4} />
        </group>

        {/* Blue rose on the right side of bench */}
        <group
          position={[-1.2, 1.2, -0.3]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        >
          <BlueRose scale={0.1} />
        </group>
      </group>

      {/* Four Sakura Trees positioned around the bench */}
      {/* Front Left */}
      <group position={[-5, 4, 5]} scale={5}>
        <SakuraTree />
      </group>

      {/* Front Right */}
      <group position={[5, 4, 5]} scale={5}>
        <SakuraTree />
      </group>

      {/* Back Left */}
      <group position={[-5, 4, -5]} scale={5} rotate={180}>
        <SakuraTree />
      </group>

      {/* Back Right */}
      <group position={[5, 4, -5]} scale={5}>
        <SakuraTree />
      </group>

      {/* Falling petals effect */}
      <Petals />
    </>
  );
}

// Animated falling petals
function Petals() {
  const petalsRef = useRef();

  useEffect(() => {
    if (petalsRef.current) {
      const positions = petalsRef.current.geometry.attributes.position;
      const velocities = [];

      for (let i = 0; i < positions.count; i++) {
        velocities.push({
          x: (Math.random() - 0.5) * 0.02,
          y: -Math.random() * 0.02 - 0.01,
          z: (Math.random() - 0.5) * 0.02,
        });
      }

      const animate = () => {
        for (let i = 0; i < positions.count; i++) {
          positions.array[i * 3] += velocities[i].x;
          positions.array[i * 3 + 1] += velocities[i].y;
          positions.array[i * 3 + 2] += velocities[i].z;

          // Reset petals when they fall too low
          if (positions.array[i * 3 + 1] < -2) {
            positions.array[i * 3 + 1] = 10;
          }
        }
        positions.needsUpdate = true;
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  const petalCount = 100;
  const positions = new Float32Array(petalCount * 3);

  for (let i = 0; i < petalCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={petalsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={petalCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffb3d9" transparent opacity={0.8} />
    </points>
  );
}
