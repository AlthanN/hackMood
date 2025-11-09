import { useGLTF } from "@react-three/drei";

export function Pond(props) {
  const { nodes, materials } = useGLTF("/camp_world/Pond.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat9}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat12}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_4"].geometry}
        material={materials.mat7}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_5"].geometry}
        material={materials.mat3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_6"].geometry}
        material={materials.mat10}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_7"].geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_8"].geometry}
        material={materials.mat18}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_9"].geometry}
        material={materials.mat25}
      />
    </group>
  );
}

useGLTF.preload("/Pond.glb");
