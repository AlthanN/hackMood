import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TreeFrog(props) {
  const { nodes, materials } = useGLTF('/happy_world/Treefrog.glb')
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

useGLTF.preload('/Treefrog.glb')