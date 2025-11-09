import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function OrangeChair(props) {
  const { nodes, materials } = useGLTF('/happy_world/OrangeChair.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh294144946.geometry}
        material={materials.mat13}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh294144946_1.geometry}
        material={materials.mat22}
      />
    </group>
  )
}

useGLTF.preload('/OrangeChair.glb')