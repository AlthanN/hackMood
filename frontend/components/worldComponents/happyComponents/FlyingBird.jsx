import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function FlyingSeagull(props) {
  const { nodes, materials } = useGLTF('/happy_world/FlyingSeagull.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Flying_seagull.geometry}
        material={materials.lambert5SG}
      />
    </group>
  )
}

useGLTF.preload('/FlyingSeagull.glb')