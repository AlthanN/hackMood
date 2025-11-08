import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Barn(props) {
  const { nodes, materials } = useGLTF('/country_world/Barn.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.barn.geometry} material={materials.None} />
    </group>
  )
}

useGLTF.preload('/Barn.glb')

export default Barn;
