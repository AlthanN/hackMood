import { useGLTF } from "@react-three/drei";

export function Rose(props) {
  const { nodes, materials } = useGLTF("/sakura_world/rose.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object003.geometry}
        material={materials["06___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object002_1.geometry}
        material={materials["05___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object002_1_1.geometry}
        material={materials["06___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/rose.glb");
