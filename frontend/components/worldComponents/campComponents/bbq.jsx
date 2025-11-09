import { useGLTF } from "@react-three/drei";

export function BBQ(props) {
  const { nodes, materials } = useGLTF("/camp_world/Barbecue Grill.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat19}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat23}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat17}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_4"].geometry}
        material={materials.mat15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_5"].geometry}
        material={materials.mat14}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_6"].geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_7"].geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload("/Barbecue Grill.glb");
