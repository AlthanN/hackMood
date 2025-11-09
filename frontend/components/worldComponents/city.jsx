import { CityBuild } from "./cityComponents/city";
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
extend({ Color: THREE.Color, Fog: THREE.Fog });

function City() {
  const rainCount = 1000;
  const rainGeo = useRef();

  const [lightningIntensity, setLightningIntensity] = useState(0);
  const [skyColor, setSkyColor] = useState("#1a1a2e");
  const [fogColor, setFogColor] = useState("#1a1a2e");
  const lightningTimer = useRef(0);

  const rainSoundRef = useRef(null);
  const thunderSoundRef = useRef(null);

  // Load audio when component mounts
  useEffect(() => {
    // Rain sound
    const rainAudio = new Audio("/sounds/rain.wav");
    rainAudio.loop = true;
    rainAudio.volume = 0.5; // subtle
    rainAudio.play().catch(() => {
      console.log(
        "Rain audio will start when user interacts (browser autoplay policy)."
      );
    });
    rainSoundRef.current = rainAudio;

    // Thunder sound
    thunderSoundRef.current = new Audio("/sounds/lightning.wav");
    thunderSoundRef.current.volume = 1.0;

    return () => {
      rainAudio.pause();
      rainAudio.src = "";
      if (thunderSoundRef.current) {
        thunderSoundRef.current.pause();
        thunderSoundRef.current.src = "";
      }
    };
  }, []);

  const rainPositions = useMemo(() => {
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = Math.random() * 50;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Animate rain
    if (rainGeo.current) {
      const positions = rainGeo.current.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.5;
        if (positions[i] < -10) positions[i] = 50;
      }
      rainGeo.current.attributes.position.needsUpdate = true;
    }

    // Lightning timer
    lightningTimer.current += delta;
    if (lightningTimer.current > Math.random() * 5 + 3) {
      lightningTimer.current = 0;
      flashLightning();
    }
  });

  function flashLightning() {
    // Play thunder sound (slightly delayed for realism)
    setTimeout(() => {
      if (thunderSoundRef.current) {
        // Restart sound from beginning
        thunderSoundRef.current.currentTime = 0;
        thunderSoundRef.current.play();
      }
    }, 100 + Math.random() * 500); // random delay for realism

    // Flash sky and light
    setLightningIntensity(200);
    setSkyColor("#d0e7ff");
    setFogColor("#bcdfff");

    // Fade out
    setTimeout(() => {
      setLightningIntensity(0);
      setSkyColor("#1a1a2e");
      setFogColor("#1a1a2e");
    }, 100);

    // Optional double flash
    setTimeout(() => {
      setLightningIntensity(150);
      setSkyColor("#e6f2ff");
      setFogColor("#cce6ff");
    }, 150);
    setTimeout(() => {
      setLightningIntensity(0);
      setSkyColor("#1a1a2e");
      setFogColor("#1a1a2e");
    }, 250);
  }

  return (
    <>
      {/* Dynamic stormy sky */}
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[fogColor, 20, 100]} />

      {/* Rain */}
      <points>
        <bufferGeometry ref={rainGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={rainCount}
            array={rainPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#88ccff" transparent opacity={0.6} />
      </points>

      {/* Lights */}
      <directionalLight
        position={[5, 20, 5]}
        intensity={0.5}
        color="#aabbff"
        castShadow
      />

      <CityBuild position={[0, 0, 0]} scale={4} />

      <ambientLight intensity={1} color="#444466" />

      {/* Lightning flash */}
      <pointLight
        position={[0, 30, 0]}
        intensity={lightningIntensity}
        distance={200}
        color="#ffffff"
      />

      {/* Street lights */}
      <pointLight
        position={[6, 1, -14]}
        intensity={20}
        distance={10}
        color="#ffffcc"
      />
      <pointLight
        position={[10, 3, 4]}
        intensity={20}
        distance={10}
        color="#ffffcc"
      />
      <pointLight
        position={[-2, 3, 3]}
        intensity={1}
        distance={5}
        color="#ffffcc"
      />
      <pointLight
        position={[-2, 3, 8]}
        intensity={1}
        distance={5}
        color="#ffffcc"
      />
    </>
  );
}

export default City;
