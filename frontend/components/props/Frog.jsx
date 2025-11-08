import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Frog(props) {
  const { nodes, materials } = useGLTF('/Tree frog.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Geo_Frog.geometry}
        material={materials.lambert2SG}
      />
    </group>
  )
}

useGLTF.preload('/Tree frog.glb')
