import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Table(props) {
  const { nodes, materials } = useGLTF('/happy_world/Table.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Node.geometry} material={materials.mat20} />
    </group>
  )
}

useGLTF.preload('/Side table.glb')