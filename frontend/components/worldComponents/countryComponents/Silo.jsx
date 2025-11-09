import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Silo(props) {
  const { nodes, materials } = useGLTF('/country_world/Silo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.silo.geometry} material={materials.None} />
    </group>
  )
}

useGLTF.preload('/Silo.glb');

export default Silo;
