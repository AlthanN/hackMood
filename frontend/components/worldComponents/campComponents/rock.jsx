import { useGLTF } from "@react-three/drei";

export function Rock(props) {
  const { nodes, materials } = useGLTF("/camp_world/Rocks.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Stone_Dark}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Rocks.glb");
