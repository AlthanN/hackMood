import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Bucket(props) {
  const { nodes, materials } = useGLTF('/happy_world/Bucket.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.lambert3SG}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.lambert2SG}
      />
    </group>
  )
}

useGLTF.preload('/Bucket.glb')