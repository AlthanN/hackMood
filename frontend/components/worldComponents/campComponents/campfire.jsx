import { useGLTF } from "@react-three/drei";

export function Campfire(props) {
  const { nodes, materials } = useGLTF("/camp_world/Campfire.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh"].geometry}
        material={materials.FF5722}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh_1"].geometry}
        material={materials["78909C"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh_2"].geometry}
        material={materials.FFCC88}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh_3"].geometry}
        material={materials.FFEB3B}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh_4"].geometry}
        material={materials["795548"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["campfire_01_Plane003-Mesh_5"].geometry}
        material={materials.CFD8DC}
      />
    </group>
  );
}

useGLTF.preload("/Campfire.glb");
