import { useGLTF } from "@react-three/drei";

export function Bench(props) {
  const { nodes, materials } = useGLTF("/sakura_world/Park Bench.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Park_Bench_Cube-Mesh"].geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Park_Bench_Cube-Mesh_1"].geometry}
        material={materials.Wood}
      />
    </group>
  );
}

useGLTF.preload("/Park Bench.glb");
