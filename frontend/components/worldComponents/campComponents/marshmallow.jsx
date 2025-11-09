import { useGLTF } from "@react-three/drei";

export function Marshmallow(props) {
  const { nodes, materials } = useGLTF("/camp_world/Marshmallows.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat24}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat20}
      />
    </group>
  );
}

useGLTF.preload("/Marshmallows.glb");
