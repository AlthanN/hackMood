import { useGLTF } from "@react-three/drei";

export function Cabin(props) {
  const { nodes, materials } = useGLTF("/camp_world/Cabin Shed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cabin_shed.geometry}
        material={materials.Diffuse_color}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Cabin Shed.glb");
