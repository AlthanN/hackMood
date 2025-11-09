import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Stairs(props) {
  const { nodes, materials } = useGLTF('/country_world/Stairs.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stairs_1.geometry}
          material={materials.Stone_Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stairs_2.geometry}
          material={materials.Stone_Dark}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Stairs.glb')

export default Stairs;
