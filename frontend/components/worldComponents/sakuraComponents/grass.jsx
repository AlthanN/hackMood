import { useGLTF } from "@react-three/drei";

export function Grass(props) {
  const { nodes, materials } = useGLTF("/sakura_world/grass.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group
          rotation={[3.084, -0.718, -2.98]}
          scale={[67.837, 67.837, 42.702]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002_Material003_0.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002_Material004_0.geometry}
            material={materials["Material.004"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/grass.glb");
