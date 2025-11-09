import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Seagull(props) {
  const { nodes, materials } = useGLTF('/happy_world/Seagull.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Gull.geometry}
        material={materials.lambert4SG}
      />
    </group>
  )
}

useGLTF.preload('/Seagull.glb')