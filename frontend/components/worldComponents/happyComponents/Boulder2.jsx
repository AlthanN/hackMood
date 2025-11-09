import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Boulder2(props) {
  const { nodes, materials } = useGLTF('/happy_world/Rock2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Resource_Rock_1.geometry}
        material={materials.Stone}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/Rock2.glb')