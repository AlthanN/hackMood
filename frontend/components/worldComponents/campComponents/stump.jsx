import { useGLTF } from "@react-three/drei";

export function Stump(props) {
  const { nodes, materials } = useGLTF("/camp_world/Tree Stump.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload("/Tree Stump.glb");
