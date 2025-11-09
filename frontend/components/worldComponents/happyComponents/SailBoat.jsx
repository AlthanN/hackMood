import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Sailboat(props) {
  const { nodes, materials } = useGLTF('/happy_world/Sailboat.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Sailboat.geometry} material={materials.Mat} />
    </group>
  )
}

useGLTF.preload('/Sailboat.glb')