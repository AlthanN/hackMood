import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Rocks(props) {
  const { nodes, materials } = useGLTF('/country_world/Rocks.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Stone_Dark}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/Rocks.glb')

export default Rocks;
