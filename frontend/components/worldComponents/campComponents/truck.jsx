import { useGLTF } from "@react-three/drei";

export function Truck(props) {
  const { nodes, materials } = useGLTF("/camp_world/Pickup Truck.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackWheels.geometry}
        material={materials.Atlas}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontWheel_R.geometry}
        material={materials.Atlas}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontWheel_L.geometry}
        material={materials.Atlas}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pickup_1.geometry}
          material={materials.Atlas}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pickup_2.geometry}
          material={materials.Headlights}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pickup_3.geometry}
          material={materials.BrakeLight}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Pickup Truck.glb");
