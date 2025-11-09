import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PTree(props) {
  const { nodes, materials } = useGLTF('/happy_world/Palm Tree.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Environment_PalmTree_3.geometry}
        material={materials.Atlas}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/Palm Tree.glb')