import { useGLTF } from "@react-three/drei";

export function Picnic(props) {
  const { nodes, materials } = useGLTF("/camp_world/Picnic Table.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bench.geometry}
        material={materials.Bench}
        position={[0, 0.961, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={48}
      />
      <group
        position={[0.064, 1.008, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cover_1.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cover_2.geometry}
          material={materials.Red}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Picnic Table.glb");
