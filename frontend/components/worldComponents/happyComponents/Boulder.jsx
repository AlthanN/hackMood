import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Boulder(props) {
  const { nodes, materials } = useGLTF('/happy_world/Rock.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Node.geometry} material={materials.mat22} />
    </group>
  )
}

useGLTF.preload('/Rock.glb')
