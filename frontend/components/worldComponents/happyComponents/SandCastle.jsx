import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function SandCastle(props) {
  const { nodes, materials } = useGLTF('/happy_world/SandCastle.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Node.geometry}
        material={materials.lambert11SG}
      />
    </group>
  )
}

useGLTF.preload('/Sand castle.glb')